package com.cdac.resource;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.cdac.dto.AddReviewRequest;
import com.cdac.dto.CommonApiResponse;
import com.cdac.dto.FoodReviewResponseDto;
import com.cdac.entity.Food;
import com.cdac.entity.Review;
import com.cdac.entity.User;
import com.cdac.exception.ReviewSaveFailedException;
import com.cdac.service.FoodService;
import com.cdac.service.ReviewService;
import com.cdac.service.UserService;

@Component
public class ReviewResource {

	private final Logger LOG = LoggerFactory.getLogger(FoodResource.class);

	@Autowired
	private FoodService foodService;

	@Autowired
	private UserService userService;

	@Autowired
	private ReviewService reviewService;

	public ResponseEntity<CommonApiResponse> addReview(AddReviewRequest request) {

		LOG.info("request received for adding food review");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getUserId() == 0 || request.getFoodId() == 0 || request.getStar() == 0
				|| request.getReview() == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(request.getUserId());

		if (user == null) {
			response.setResponseMessage("user not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Food food = this.foodService.getFoodById(request.getFoodId());

		if (food == null) {
			response.setResponseMessage("food not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Review review = new Review();
		review.setFood(food);
		review.setReview(request.getReview());
		review.setStar(request.getStar());
		review.setUser(user);

		Review addedReview = this.reviewService.addReview(review);

		if (addedReview == null) {
			throw new ReviewSaveFailedException("Failed to save the review");
		}

		response.setResponseMessage("food review added successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<FoodReviewResponseDto> fetchFoodReviews(int foodId) {

		LOG.info("request received for fetching the food reviews");

		FoodReviewResponseDto response = new FoodReviewResponseDto();

		if (foodId == 0) {
			response.setResponseMessage("food id missing");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		Food food = this.foodService.getFoodById(foodId);

		if (food == null) {
			response.setResponseMessage("food not found");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<Review> reviews = this.reviewService.fetchFoodReviews(Arrays.asList(food));

		if (CollectionUtils.isEmpty(reviews)) {
			response.setResponseMessage("No food reviews yet");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.OK);
		}
		
		double averageRating = averageFoodRating(reviews);

		response.setReviews(reviews);
		response.setAverageRating(averageRating);
		response.setResponseMessage("food reviews fetched");
		response.setSuccess(true);

		return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.OK);
	}

	private double averageFoodRating(List<Review> reviews) {

		int totalReviews = reviews.size();

		if (totalReviews == 0) {
			return 0.0;
		}

		// Calculate the sum of all the ratings
		int sum = 0;

		for (Review review : reviews) {
			sum += review.getStar();
		}

		// Calculate the average rating
		double averageRating = (double) sum / totalReviews;
		
		// Format the average rating to one decimal place
	    DecimalFormat df = new DecimalFormat("#.#");
	    averageRating = Double.parseDouble(df.format(averageRating));

		return averageRating;
	}

	public ResponseEntity<FoodReviewResponseDto> fetchRestaurantFoodReviews(int sellerId) {

		LOG.info("request received for fetching the seller food reviews");

		FoodReviewResponseDto response = new FoodReviewResponseDto();

		if (sellerId == 0) {
			response.setResponseMessage("seller id missing");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		User seller = this.userService.getUserById(sellerId);

		if (seller == null) {
			response.setResponseMessage("seller not found");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<Review> reviews = this.reviewService.fetchRestaurantFoodReview(seller);

		if (CollectionUtils.isEmpty(reviews)) {
			response.setResponseMessage("No food reviews yet");
			response.setSuccess(false);

			return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		response.setReviews(reviews);
		response.setResponseMessage("food reviews fetched");
		response.setSuccess(true);

		return new ResponseEntity<FoodReviewResponseDto>(response, HttpStatus.OK);
	}

}
