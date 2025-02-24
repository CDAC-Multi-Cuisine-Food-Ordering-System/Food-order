import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoodCard from "../FoodComponent/FoodCard";
import { useLocation } from "react-router-dom";

const RestaurantFoods = () => {
  const location = useLocation();
  const restaurant = location.state;

  const { categoryId, categoryName, restaurantName } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (categoryId == null) {
          // Fetch all foods
          response = await axios.get(
            `http://localhost:8080/api/food/fetch/restaurant-wise?restaurantId=${restaurant.id}`
          );
        } else {
          // Fetch foods by category
          response = await axios.get(
            `http://localhost:8080/api/food/fetch/restaurant-wise/category-wise?restaurantId=${restaurant.id}&categoryId=${categoryId}`
          );
        }
        if (response.data) {
          setFoods(response.data.foods);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurant, categoryId]);

  return (
    <div className="container-fluid mb-2">
      {/* <Carousel /> */}

      <div
        className="bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "1em",
          height: "38px",
        }}
      >
        <h5 class="card-title ms-3">Restaurant Name: {restaurantName}</h5>
      </div>

      <div className="col-md-12 mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {foods.map((food) => {
            return <FoodCard item={food} key={food.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFoods;
