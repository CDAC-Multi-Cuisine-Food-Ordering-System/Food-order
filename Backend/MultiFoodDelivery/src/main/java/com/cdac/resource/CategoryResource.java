package com.cdac.resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.cdac.dto.CategoryResponseDto;
import com.cdac.dto.CommonApiResponse;
import com.cdac.entity.Category;
import com.cdac.entity.Food;
import com.cdac.exception.CategorySaveFailedException;
import com.cdac.service.CategoryService;
import com.cdac.service.FoodService;
import com.cdac.utility.Constants.CategoryStatus;
import com.cdac.utility.Constants.FoodStatus;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class CategoryResource {

	private final Logger LOG = LoggerFactory.getLogger(CategoryResource.class);

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private FoodService foodService;
	
	public ResponseEntity<CommonApiResponse> addCategory(Category category) {
		
		LOG.info("Request received for add category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(CategoryStatus.ACTIVE.value());

		Category savedCategory = this.categoryService.addCategory(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to add category");
		}

		response.setResponseMessage("Category Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateCategory(Category category) {
		
		LOG.info("Request received for add category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (category.getId() == 0) {
			response.setResponseMessage("missing category Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(CategoryStatus.ACTIVE.value());
		Category savedCategory = this.categoryService.updateCategory(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to update category");
		}

		response.setResponseMessage("Category Updated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CategoryResponseDto> fetchAllCategory() {

		LOG.info("Request received for fetching all categories");

		CategoryResponseDto response = new CategoryResponseDto();

		List<Category> categories = new ArrayList<>();

		categories = this.categoryService.getCategoriesByStatusIn(Arrays.asList(CategoryStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(categories)) {
			response.setResponseMessage("No Categories found");
			response.setSuccess(false);

			return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
		}

		response.setCategories(categories);
		response.setResponseMessage("Category fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteCategory(int categoryId) {

		LOG.info("Request received for deleting category");

		CommonApiResponse response = new CommonApiResponse();

		if (categoryId == 0) {
			response.setResponseMessage("missing category Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Category category = this.categoryService.getCategoryById(categoryId);

		if (category == null) {
			response.setResponseMessage("category not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		List<Food> foods = this.foodService.getAllFoodByCategoryAndStatusIn(category,
				Arrays.asList(FoodStatus.ACTIVE.value()));

		category.setStatus(CategoryStatus.DEACTIVATED.value());
		Category updatedCategory = this.categoryService.updateCategory(category);

		if (updatedCategory == null) {
			throw new CategorySaveFailedException("Failed to delete the Category");
		}

		if (!CollectionUtils.isEmpty(foods)) {

			for (Food food : foods) {
				food.setStatus(FoodStatus.DEACTIVATED.value());
			}

			List<Food> udpatedFoods = this.foodService.updateAllFood(foods);

			if (CollectionUtils.isEmpty(udpatedFoods)) {
				throw new CategorySaveFailedException("Failed to delete the Category");
			}

		}

		response.setResponseMessage("Category Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

}
