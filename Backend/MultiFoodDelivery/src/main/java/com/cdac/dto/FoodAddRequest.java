package com.cdac.dto;

import java.math.BigDecimal;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Food;

import lombok.Data;

@Data
public class FoodAddRequest {
	
	private int id;
	
	private String name;

	private String description;

	private BigDecimal price;

	private int categoryId;

	private int restaurantId;

	private MultipartFile image1;

	private MultipartFile image2;

	private MultipartFile image3;

	public static Food toEntity(FoodAddRequest dto) {
		Food entity = new Food();
		BeanUtils.copyProperties(dto, entity, "image1", "image2", "image3", "categoryId", "restaurantId");
		return entity;
	}

}
