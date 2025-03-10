package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Cart;
import com.cdac.entity.User;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {

	List<Cart> findByUser(User user);

}
