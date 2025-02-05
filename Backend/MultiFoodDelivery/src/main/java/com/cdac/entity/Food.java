package com.cdac.entity;

import java.math.BigDecimal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Food {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;

	private BigDecimal price;
	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
	private Category category;
	
	private String status;
	
	@ManyToOne
    @JoinColumn(name = "restaurant_user_id")
    private User restaurant;
	
	private String image1;
	
	private String image2;
	
	private String image3;
	
}
