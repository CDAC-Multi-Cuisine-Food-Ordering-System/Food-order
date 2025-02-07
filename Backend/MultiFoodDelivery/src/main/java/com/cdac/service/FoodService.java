package com.cdac.service;

import java.util.List;

import com.cdac.entity.Category;
import com.cdac.entity.Food;
import com.cdac.entity.User;

public interface FoodService {

	Food addFood(Food food);

	Food updateFood(Food food);

	Food getFoodById(int foodId);

	Long countByStatusIn(List<String> status);

	Long countByStatusInAndRestaurant(List<String> status, User restaurant);

	List<Food> getAllFoodByStatusIn(List<String> status);

	List<Food> getAllFoodByRestaurantAndStatusIn(User Restaurant, List<String> status);

	List<Food> getAllFoodByCategoryAndStatusIn(Category category, List<String> status);

	List<Food> getAllFoodByRestaurantAndCategoryAndStatusIn(User restaurant, Category category, List<String> status);

	List<Food> updateAllFood(List<Food> foods);

	List<Food> searchFoodNameAndStatusIn(String foodName, List<String> status);

	List<Food> searchFoodNameAndRestaurantAndStatusIn(String foodName, User restaurant, List<String> status);

}
