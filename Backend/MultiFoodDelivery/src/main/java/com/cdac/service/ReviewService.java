package com.cdac.service;

import java.util.List;

import com.cdac.entity.Food;
import com.cdac.entity.Review;
import com.cdac.entity.User;

public interface ReviewService {
	
	Review addReview(Review review);
	
	List<Review> fetchFoodReviews(List<Food> products);

	List<Review> fetchRestaurantFoodReview(User restaurant);
	
}
