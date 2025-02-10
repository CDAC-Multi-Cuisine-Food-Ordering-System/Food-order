package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CommonApiResponse;
import com.cdac.dto.RegisterUserRequestDto;
import com.cdac.dto.UserLoginRequest;
import com.cdac.dto.UserLoginResponse;
import com.cdac.dto.UserResponseDto;
import com.cdac.dto.UserStatusUpdateRequestDto;
import com.cdac.resource.UserResource;
import com.fasterxml.jackson.core.JsonProcessingException;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserResource userResource;

	// RegisterUserRequestDto, we will set only email, password & role from UI
	@PostMapping("/admin/register")
	@Operation(summary = "Api to register Admin")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
		return userResource.registerAdmin(request);
	}

	// for customer and restaurant register
	@PostMapping("register")
	@Operation(summary = "Api to register customer or restaurant user")
	public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
		return this.userResource.registerUser(request);
	}
	
	@PostMapping("login")
	@Operation(summary =  "Api to login any User")
	public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		return userResource.login(userLoginRequest);
	}
	
	@GetMapping("/fetch/role-wise")
	@Operation(summary =  "Api to get Users By Role")
	public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role) throws JsonProcessingException {
		return userResource.getUsersByRole(role);
	}
	
	@GetMapping("/fetch/restaurant/delivery-person")
	@Operation(summary =  "Api to get Delivery persons by restaurant")
	public ResponseEntity<UserResponseDto> fetchDeliveryPerson(@RequestParam("restaurantId") int restaurantId) {
		return userResource.getDeliveryPersonsByRestaurant(restaurantId);
	}
	
	@PutMapping("update/status")
	@Operation(summary =  "Api to update the user status")
	public ResponseEntity<CommonApiResponse> updateUserStatus(@RequestBody UserStatusUpdateRequestDto request) {
		return userResource.updateUserStatus(request);
	}
	
	@DeleteMapping("delete/restaurant")
	@Operation(summary =  "Api to update the user status")
	public ResponseEntity<CommonApiResponse> deleteRestaurant(@RequestParam("restaurantId") int restaurantId) {
		return userResource.deleteRestaurant(restaurantId);
	}
	
	@DeleteMapping("delete/restaurant/delivery-person")
	@Operation(summary =  "Api to update the user status")
	public ResponseEntity<CommonApiResponse> deleteDeliveryPerson(@RequestParam("deliveryId") int deliveryId) {
		return userResource.deleteDeliveryPerson(deliveryId);
	}

}
