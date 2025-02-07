package com.cdac.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dao.ReviewDao;
import com.cdac.entity.Food;
import com.cdac.entity.Review;
import com.cdac.entity.User;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewDao reviewDao;

	@Override
	public Review addReview(Review review) {
		return reviewDao.save(review);
	}

	@Override
	public List<Review> fetchFoodReviews(List<Food> foods) {
		return reviewDao.findByFoodIn(foods);
	}

	@Override
	public List<Review> fetchRestaurantFoodReview(User restaurant) {
		return reviewDao.findAllOrdersByRestaurant(restaurant);
	}

}
