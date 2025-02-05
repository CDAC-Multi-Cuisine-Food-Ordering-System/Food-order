package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Food;
import com.cdac.entity.Review;
import com.cdac.entity.User;

@Repository
public interface ReviewDao extends JpaRepository<Review, Integer> {
	
	List<Review> findByFoodIn(List<Food> foods);
	
	@Query("SELECT r FROM Review r WHERE r.food.restaurant = :restaurant")
	List<Review> findAllOrdersByRestaurant(@Param("restaurant") User restaurant);

}
