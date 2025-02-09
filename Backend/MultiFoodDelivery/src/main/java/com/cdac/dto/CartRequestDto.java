package com.cdac.dto;

import lombok.Data;

@Data
public class CartRequestDto {

	private int id;

	private int userId;

	private int foodId;

	private int quantity;

}
