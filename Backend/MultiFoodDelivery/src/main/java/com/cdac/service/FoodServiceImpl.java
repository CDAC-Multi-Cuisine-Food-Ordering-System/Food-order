package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dao.FoodDao;
import com.cdac.entity.Category;
import com.cdac.entity.Food;
import com.cdac.entity.User;

@Service
public class FoodServiceImpl implements FoodService {

	@Autowired
	private FoodDao foodDao;

	@Override
	public Food addFood(Food food) {
		return foodDao.save(food);
	}

	@Override
	public Food updateFood(Food food) {
		return foodDao.save(food);
	}

	@Override
	public Food getFoodById(int foodId) {

		Optional<Food> optionalFood = foodDao.findById(foodId);

		if (optionalFood.isPresent()) {
			return optionalFood.get();
		} else {
			return null;
		}

	}

	@Override
	public List<Food> getAllFoodByStatusIn(List<String> status) {
		return this.foodDao.findByStatusIn(status);
	}

	@Override
	public Long countByStatusIn(List<String> status) {
		return this.foodDao.countByStatusIn(status);
	}

	@Override
	public Long countByStatusInAndRestaurant(List<String> status, User restaurant) {
		return this.foodDao.countByStatusInAndRestaurant(status, restaurant);
	}

	@Override
	public List<Food> getAllFoodByRestaurantAndStatusIn(User Restaurant, List<String> status) {
		return this.foodDao.findByRestaurantAndStatusIn(Restaurant, status);
	}

	@Override
	public List<Food> getAllFoodByRestaurantAndCategoryAndStatusIn(User restaurant, Category category,
			List<String> status) {
		return this.foodDao.findByRestaurantAndCategoryAndAndStatusIn(restaurant, category, status);
	}

	@Override
	public List<Food> updateAllFood(List<Food> foods) {
		return this.foodDao.saveAll(foods);
	}

	@Override
	public List<Food> getAllFoodByCategoryAndStatusIn(Category category, List<String> status) {
		return this.foodDao.findByCategoryAndStatusIn(category, status);
	}

	@Override
	public List<Food> searchFoodNameAndStatusIn(String foodName, List<String> status) {

		return this.foodDao.findByNameContainingIgnoreCaseAndStatusIn(foodName, status);
	}

	@Override
	public List<Food> searchFoodNameAndRestaurantAndStatusIn(String foodName, User restaurant, List<String> status) {
		return this.foodDao.findByNameContainingIgnoreCaseAndRestaurantAndStatusIn(foodName, restaurant, status);
	}

}
