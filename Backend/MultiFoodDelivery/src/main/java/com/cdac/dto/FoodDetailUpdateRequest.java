package com.cdac.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class FoodDetailUpdateRequest {
	
	private int id;

	private String name;

	private String description;

	private BigDecimal price;
	
	private int categoryId;
	
	private int quantity;

}
