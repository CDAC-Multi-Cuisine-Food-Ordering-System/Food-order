package com.cdac.resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.cdac.dto.CommonApiResponse;
import com.cdac.dto.RegisterUserRequestDto;
import com.cdac.dto.UserDto;
import com.cdac.dto.UserLoginRequest;
import com.cdac.dto.UserLoginResponse;
import com.cdac.dto.UserResponseDto;
import com.cdac.dto.UserStatusUpdateRequestDto;
import com.cdac.entity.Address;
import com.cdac.entity.Food;
import com.cdac.entity.User;
import com.cdac.exception.UserSaveFailedException;
import com.cdac.service.AddressService;
import com.cdac.service.FoodService;
import com.cdac.service.UserService;
import com.cdac.utility.Constants.FoodStatus;
import com.cdac.utility.Constants.UserRole;
import com.cdac.utility.Constants.UserStatus;
import com.cdac.utility.JwtUtils;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class UserResource {

	private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private UserService userService;

	@Autowired
	private AddressService addressService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private FoodService foodService;

	@Autowired
	private JwtUtils jwtUtils;

	public ResponseEntity<CommonApiResponse> registerAdmin(RegisterUserRequestDto registerRequest) {

		LOG.info("Request received for Register Admin");

		CommonApiResponse response = new CommonApiResponse();

		if (registerRequest == null) {
			response.setResponseMessage("user is null");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (registerRequest.getEmailId() == null || registerRequest.getPassword() == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User existingUser = this.userService.getUserByEmailAndStatus(registerRequest.getEmailId(),
				UserStatus.ACTIVE.value());

		if (existingUser != null) {
			response.setResponseMessage("User already register with this Email");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = RegisterUserRequestDto.toUserEntity(registerRequest);

		user.setRole(UserRole.ROLE_ADMIN.value());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		user.setStatus(UserStatus.ACTIVE.value());

		existingUser = this.userService.addUser(user);

		if (existingUser == null) {
			response.setResponseMessage("failed to register admin");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setResponseMessage("Admin registered Successfully");
		response.setSuccess(true);

		LOG.info("Response Sent!!!");

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> registerUser(RegisterUserRequestDto request) {

		LOG.info("Received request for register user");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("user is null");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User existingUser = this.userService.getUserByEmailAndStatus(request.getEmailId(), UserStatus.ACTIVE.value());

		if (existingUser != null) {
			response.setResponseMessage("User with this Email Id already resgistered!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getRole() == null) {
			response.setResponseMessage("bad request ,Role is missing");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = RegisterUserRequestDto.toUserEntity(request);

		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setStatus(UserStatus.ACTIVE.value());
		user.setPassword(encodedPassword);

		// delivery person is for seller, so we need to set Restaurant
		if (user.getRole().equals(UserRole.ROLE_DELIVERY.value())) {

			User seller = this.userService.getUserById(request.getRestaurantId());

			if (seller == null) {
				response.setResponseMessage("Restaurant not found,");
				response.setSuccess(false);

				return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			user.setRestaurant(seller);

		}
		
		Address address = new Address();
		address.setCity(request.getCity());
		address.setPincode(request.getPincode());
		address.setStreet(request.getStreet());

		Address savedAddress = this.addressService.addAddress(address);

		if (savedAddress == null) {
			throw new UserSaveFailedException("Registration Failed because of Technical issue:(");
		}

		user.setAddress(savedAddress);
		existingUser = this.userService.addUser(user);

		if (existingUser == null) {
			throw new UserSaveFailedException("Registration Failed because of Technical issue:(");
		}

		

		response.setResponseMessage("User registered Successfully");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<UserLoginResponse> login(UserLoginRequest loginRequest) {

		LOG.info("Received request for User Login");

		UserLoginResponse response = new UserLoginResponse();

		if (loginRequest == null) {
			response.setResponseMessage("Missing Input");
			response.setSuccess(false);

			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String jwtToken = null;
		User user = null;

		List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(loginRequest.getRole()));

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmailId(),
					loginRequest.getPassword(), authorities));
		} catch (Exception ex) {
			response.setResponseMessage("Invalid email or password.");
			response.setSuccess(false);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

		jwtToken = jwtUtils.generateToken(loginRequest.getEmailId());

		user = this.userService.getUserByEmailIdAndRoleAndStatus(loginRequest.getEmailId(), loginRequest.getRole(),
				UserStatus.ACTIVE.value());

		UserDto userDto = UserDto.toUserDtoEntity(user);

		// user is authenticated
		if (jwtToken != null) {
			response.setUser(userDto);
			response.setResponseMessage("Logged in sucessful");
			response.setSuccess(true);
			response.setJwtToken(jwtToken);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.OK);
		}

		else {
			response.setResponseMessage("Failed to login");
			response.setSuccess(false);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<UserResponseDto> getUsersByRole(String role) {

		UserResponseDto response = new UserResponseDto();

		if (role == null) {
			response.setResponseMessage("missing role");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<User> users = new ArrayList<>();

		users = this.userService.getUserByRoleAndStatus(role, UserStatus.ACTIVE.value());

		if (users.isEmpty()) {
			response.setResponseMessage("No Users Found");
			response.setSuccess(false);
		}

		List<UserDto> userDtos = new ArrayList<>();

		for (User user : users) {

			UserDto dto = UserDto.toUserDtoEntity(user);

			if (role.equals(UserRole.ROLE_DELIVERY.value())) {

				UserDto sellerDto = UserDto.toUserDtoEntity(user.getRestaurant());
				dto.setRestaurant(sellerDto);

			}

			userDtos.add(dto);

		}

		response.setUsers(userDtos);
		response.setResponseMessage("User Fetched Successfully");
		response.setSuccess(true);

		return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> updateUserStatus(UserStatusUpdateRequestDto request) {

		LOG.info("Received request for updating the user status");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("bad request, missing data");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getUserId() == 0) {
			response.setResponseMessage("bad request, user id is missing");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = null;
		user = this.userService.getUserById(request.getUserId());

		user.setStatus(request.getStatus());

		User updatedUser = this.userService.updateUser(user);

		if (updatedUser == null) {
			throw new UserSaveFailedException("Failed to update the User status");
		}

		response.setResponseMessage("User " + request.getStatus() + " Successfully!!!");
		response.setSuccess(true);
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<UserResponseDto> getDeliveryPersonsByRestaurant(int sellerId) {

		UserResponseDto response = new UserResponseDto();

		if (sellerId == 0) {
			response.setResponseMessage("missing seller id");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		User seller = this.userService.getUserById(sellerId);

		if (seller == null) {
			response.setResponseMessage("Restaurant not found");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<User> users = new ArrayList<>();

		users = this.userService.getUserByRestaurantAndRoleAndStatusIn(seller, UserRole.ROLE_DELIVERY.value(),
				Arrays.asList(UserStatus.ACTIVE.value()));

		if (users.isEmpty()) {
			response.setResponseMessage("No Delivery Guys Found");
			response.setSuccess(false);
		}

		List<UserDto> userDtos = new ArrayList<>();

		for (User user : users) {

			UserDto dto = UserDto.toUserDtoEntity(user);
			userDtos.add(dto);

		}

		response.setUsers(userDtos);
		response.setResponseMessage("User Fetched Successfully");
		response.setSuccess(true);

		return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteRestaurant(int sellerId) {

		UserResponseDto response = new UserResponseDto();

		if (sellerId == 0) {
			response.setResponseMessage("missing seller id");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User seller = this.userService.getUserById(sellerId);

		if (seller == null) {
			response.setResponseMessage("Restaurant not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<User> deliveryPersons = new ArrayList<>();

		List<Food> foods = new ArrayList<>();

		deliveryPersons = this.userService.getUserByRestaurantAndRoleAndStatusIn(seller, UserRole.ROLE_DELIVERY.value(),
				Arrays.asList(UserStatus.ACTIVE.value()));

		foods = this.foodService.getAllFoodByRestaurantAndStatusIn(seller,
				Arrays.asList(FoodStatus.ACTIVE.value()));

		seller.setStatus(UserStatus.DEACTIVATED.value());
		User deletedRestaurant = this.userService.updateUser(seller);

		// deactivating the seller
		if (deletedRestaurant == null) {
			throw new UserSaveFailedException("Failed to deactivate the seller!!!");
		}

		// deactivating the all seller, delivery persons
		if (!deliveryPersons.isEmpty()) {

			for (User deliveryPerson : deliveryPersons) {
				deliveryPerson.setStatus(UserStatus.DEACTIVATED.value());
			}

			List<User> deletedDeliveryPerons = this.userService.updateAllUser(deliveryPersons);

			if (CollectionUtils.isEmpty(deletedDeliveryPerons)) {
				throw new UserSaveFailedException("Failed to deactivate the seller!!!");
			}

		}

		// deactivating all the listed foods by seller
		if (!foods.isEmpty()) {

			for (Food food : foods) {
				food.setStatus(FoodStatus.DEACTIVATED.value());
			}

			List<Food> deletedFoods = this.foodService.updateAllFood(foods);

			if (CollectionUtils.isEmpty(deletedFoods)) {
				throw new UserSaveFailedException("Failed to deactivate the seller!!!");
			}

		}

		response.setResponseMessage("Restaurant Deactivated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> deleteDeliveryPerson(int deliveryId) {

		UserResponseDto response = new UserResponseDto();

		if (deliveryId == 0) {
			response.setResponseMessage("missing delivery person id");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User delivery = this.userService.getUserById(deliveryId);

		if (delivery == null) {
			response.setResponseMessage("Delivery Person not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		delivery.setStatus(UserStatus.DEACTIVATED.value());

		
		User deletedDelivery = this.userService.updateUser(delivery);

		// deactivating the seller
		if (deletedDelivery == null) {
			throw new UserSaveFailedException("Failed to deactivate the delivery person!!!");
		}

		response.setResponseMessage("Delivery Person Deactivated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

}
