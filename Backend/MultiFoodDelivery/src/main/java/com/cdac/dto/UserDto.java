package com.cdac.dto;

import org.springframework.beans.BeanUtils;

import com.cdac.entity.Address;
import com.cdac.entity.User;

import lombok.Data;

@Data
public class UserDto {
	
	private int id;

	private String firstName;

	private String lastName;

	private String emailId;

	private String phoneNo;

	private String role;

	private Address address;

	private UserDto restaurant;

	private String status;
	
	public static UserDto toUserDtoEntity(User user) {
		UserDto userDto =new UserDto();
		BeanUtils.copyProperties(user, userDto, "seller");		
		return userDto;
	}

}
