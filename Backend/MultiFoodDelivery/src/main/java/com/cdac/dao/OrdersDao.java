package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Orders;
import com.cdac.entity.User;

@Repository
public interface OrdersDao extends JpaRepository<Orders, Integer> {

	List<Orders> findByOrderId(String orderId);

	List<Orders> findByOrderIdAndStatusIn(String orderId, List<String> status);

	List<Orders> findByUser(User user);

	List<Orders> findByUserAndStatusIn(User user, List<String> status);

	@Query("SELECT o FROM Orders o WHERE o.food.restaurant = :restaurant and status In (:status)")
	List<Orders> findAllOrdersByRestaurantAndStatusIn(@Param("restaurant") User restaurant, @Param("status") List<String> status);

	@Query("SELECT o FROM Orders o WHERE o.food.restaurant = :restaurant And status In (:status) AND o.orderTime BETWEEN :startDate AND :endDate")
	List<Orders> findByRestaurantAndStatusAndOrderTime(@Param("restaurant") User restaurant, @Param("status") List<String> status,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query("SELECT o FROM Orders o WHERE status In (:status) AND o.orderTime BETWEEN :startDate AND :endDate")
	List<Orders> findByStatusAndOrderTime(@Param("status") List<String> status, @Param("startDate") String startDate,
			@Param("endDate") String endDate);
	
	@Query("SELECT o FROM Orders o WHERE status In (:status) AND o.deliveryPerson = :deliveryPerson")
	List<Orders> findByStatusAndDeliveryPerson(@Param("status") List<String> status, @Param("deliveryPerson") User deliveryPerson);

}
