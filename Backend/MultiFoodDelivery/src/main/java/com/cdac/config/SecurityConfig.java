package com.cdac.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cdac.filter.JwtAuthFilter;
import com.cdac.utility.Constants.UserRole;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthFilter authFilter;

	@Bean
	// authentication
	public UserDetailsService userDetailsService() {
		return new CustomUserDetailsService();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())
		        .cors(cors -> cors.disable())
		    
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/api/user/login", "/api/user/register").permitAll()
						
						// this APIs are only accessible by ADMIN
						.requestMatchers("/api/user/admin/register","/api/user/delete/restaurant", "/api/order/fetch/all",
								"/api/category/update", "/api/category/add", "/api/category/delete")
						.hasAuthority(UserRole.ROLE_ADMIN.value())
						
						// this APIs are only accessible by RESTAURANT
						.requestMatchers("/api/user/fetch/restaurant/delivery-person", "/api/user/delete/restaurant/delivery-person", "/api/food/update/image",
								"/api/food/update/detail", "/api/food/add", "/api/food/delete",
								"/api/order/assign/delivery-person", "/api/order/fetch/restaurant-wise",
								"/api/food/review/restaurant")
						.hasAuthority(UserRole.ROLE_RESTAURANT.value())
						
						// this APIs are only accessible by DELIVERY PERSON
						.requestMatchers("/api/order/update/delivery-status", "/api/order/fetch/delivery-wise")
						.hasAuthority(UserRole.ROLE_DELIVERY.value())
						
						// this APIs are only accessible by RESTAURANT
						.requestMatchers("/api/order/add", "/api/order/fetch/user-wise", "/api/cart/update",
								"/api/cart/add", "/api/cart/fetch", "/api/cart/delete", "/api/food/review/add")
						.hasAuthority(UserRole.ROLE_CUSTOMER.value())

						// this APIs are only accessible by ADMIN & RESTAURANT
						.requestMatchers("/api/user/fetch/role-wise", "/api/user/update/status")
						.hasAnyAuthority(UserRole.ROLE_ADMIN.value(), UserRole.ROLE_RESTAURANT.value())
						
						.anyRequest()
						.permitAll())
		        
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
