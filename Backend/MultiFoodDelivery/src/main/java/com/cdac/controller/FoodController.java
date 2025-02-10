package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CommonApiResponse;
import com.cdac.dto.FoodAddRequest;
import com.cdac.dto.FoodDetailUpdateRequest;
import com.cdac.dto.FoodResponseDto;
import com.cdac.resource.FoodResource;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

	@Autowired
	private FoodResource foodResource;

	@PostMapping("add")
	@Operation(summary = "Api to add food")
	public ResponseEntity<CommonApiResponse> addFood(FoodAddRequest foodDto) {
		return this.foodResource.addFood(foodDto);
	}

	@PutMapping("update/detail")
	@Operation(summary = "Api to update food details")
	public ResponseEntity<CommonApiResponse> updateFoodDetails(@RequestBody FoodDetailUpdateRequest request) {
		System.out.println(request);
		return this.foodResource.updateFoodDetail(request);
	}

	@PutMapping("update/image")
	@Operation(summary = "Api to update food images")
	public ResponseEntity<CommonApiResponse> updateFoodDetails(FoodAddRequest request) {
		return this.foodResource.updateFoodImage(request);
	}

	@DeleteMapping("delete")
	@Operation(summary = "Api to delete food")
	public ResponseEntity<CommonApiResponse> deleteFood(@RequestParam("foodId") int foodId,
			@RequestParam("restaurantId") int restaurantId) {
		return this.foodResource.deleteFood(foodId, restaurantId);
	}

	@GetMapping("fetch")
	@Operation(summary = "Api to fetch food by Id")
	public ResponseEntity<FoodResponseDto> fetchFoodById(@RequestParam(name = "foodId") int foodId) {
		return this.foodResource.fetchFoodById(foodId);
	}

	@GetMapping("fetch/all")
	@Operation(summary = "Api to fetch all active food")
	public ResponseEntity<FoodResponseDto> fetchAllFood(

	) {
		return this.foodResource.fetchAllFoods();
	}

	@GetMapping("fetch/restaurant-wise")
	@Operation(summary = "Api to fetch all restaurant active food")
	public ResponseEntity<FoodResponseDto> fetchAllRestaurantFood(@RequestParam(name = "restaurantId") int restaurantId) {
		return this.foodResource.fetchAllRestaurantFoods(restaurantId);
	}

	@GetMapping("fetch/restaurant-wise/category-wise")
	@Operation(summary = "Api to fetch all restaurant active food")
	public ResponseEntity<FoodResponseDto> fetchAllRestaurantFoodAndCategory(
			@RequestParam(name = "restaurantId") int restaurantId, @RequestParam(name = "categoryId") int categoryId) {
		return this.foodResource.fetchAllRestaurantFoodsWithCategory(restaurantId, categoryId);
	}

	@GetMapping("search")
	@Operation(summary = "Api to search the foods by name")
	public ResponseEntity<FoodResponseDto> searchFoodsByName(
			@RequestParam(name = "foodName") String foodName) {
		return this.foodResource.searchFoodByName(foodName);
	}

	@GetMapping("search/restaurant-wise")
	@Operation(summary = "Api to search the restaurant foods by name")
	public ResponseEntity<FoodResponseDto> searchRestaurantFoodsByName(
			@RequestParam(name = "foodName") String foodName, @RequestParam(name = "restaurantId") int restaurantId) {
		return this.foodResource.searchRestaurantFoodsByName(foodName, restaurantId);
	}

	@GetMapping("fetch/category-wise")
	@Operation(summary = "Api to fetch all foods by category")
	public ResponseEntity<FoodResponseDto> fetchAllFoodsByCategory(
			@RequestParam(name = "categoryId") int categoryId) {
		return this.foodResource.fetchAllFoodsByCategory(categoryId);
	}

	@GetMapping(value = "/{foodImageName}", produces = "image/*")
	public void fetchFoodImage(@PathVariable("foodImageName") String foodImageName, HttpServletResponse resp) {

		this.foodResource.fetchFoodImage(foodImageName, resp);

	}

}
