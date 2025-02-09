package com.cdac.service;

import java.util.List;

import com.cdac.entity.Address;
import com.cdac.entity.User;

public interface AddressService {
	
	Address addAddress(Address address);
	
	Address updateAddress(Address address);
	
	Address getAddressById(int addressId);

}
