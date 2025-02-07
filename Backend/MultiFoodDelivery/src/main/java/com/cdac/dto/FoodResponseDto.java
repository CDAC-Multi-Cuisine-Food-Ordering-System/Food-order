package com.cdac.dto;

import java.util.ArrayList;
import java.util.List;

import com.cdac.entity.Food;

import lombok.Data;

@Data
public class FoodResponseDto extends CommonApiResponse {
	
	private List<Food> foods = new ArrayList<>();

}
