import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";
import GetFoodReviews from "../ReviewComponent/GetFoodReviews";
import FoodCarousel from "./FoodCarousel";

const Food = () => {
  const { foodId, categoryId } = useParams();

  let navigate = useNavigate();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [quantity, setQuantity] = useState("");

  const [foods, setFoods] = useState([]);

  const [food, setFood] = useState({
    restaurant: {
      firstName: "",
    },
  });

  const retrieveFood = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch?foodId=" + foodId
    );

    return response.data;
  };

  useEffect(() => {
    const getFood = async () => {
      const retrievedFood = await retrieveFood();

      setFood(retrievedFood.foods[0]);
    };

    const getFoodsByCategory = async () => {
      const allFoods = await retrieveFoodsByCategory();
      if (allFoods) {
        setFoods(allFoods.foods);
      }
    };

    getFood();
    getFoodsByCategory();
  }, [foodId]);

  const retrieveFoodsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/category-wise?categoryId=" +
        categoryId
    );
    console.log(response.data);
    return response.data;
  };

  const saveFoodToCart = (userId) => {
    fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        foodId: foodId,
      }),
    }).then((result) => {
      result.json().then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/customer/cart");
          }, 2000); // Redirect after 3 seconds
        } else if (!res.success) {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        }
      });
    });
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (user == null) {
      alert("Please login to buy the foods!!!");
    } else if (food.quantity < 1) {
      toast.error("Food Out Of Stock !!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else {
      saveFoodToCart(user.id);
      setQuantity("");
    }
  };

  const navigateToAddReviewPage = () => {
    navigate("/food/" + food.id + "/review/add", { state: food });
  };

  const restaurantFoodPage = () => {
    console.log(food.restaurant.firstName);
    navigate(
      `/food/restaurant/${food.restaurant.id}/${food.restaurant.firstName}`,
      {
        state: food.restaurant,
      }
    );
  };

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-sm-3 mt-2 admin">
          <div class="card form-card shadow-lg">
            <FoodCarousel
              item={{
                image1: food.image1,
                image2: food.image2,
                image3: food.image3,
              }}
            />
          </div>
        </div>
        <div class="col-sm-6 mt-2">
          <div class="card form-card shadow-lg">
            <div
              className="card-header bg-color custom-bg-text "
              style={{
                borderRadius: "1em",
                height: "50px",
              }}
            >
              <h3 class="card-title">{food.name}</h3>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 class="card-text">{food.description}</h4>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Restaurant Details:</h3>
              </div>

              <div className="d-flex justify-content-left">
                <h4 class="card-text">
                  <b className="text-color" onClick={restaurantFoodPage}>
                    Name:{" "}
                    <span className="text-color-second">
                      {food.restaurant.firstName + " "}
                    </span>
                  </b>
                </h4>
                <h4 class="card-text ms-4">
                  Contact: {food.restaurant.emailId + " "}
                </h4>
              </div>
            </div>

            <div class="card-footer">
              <div className="text-center text-color-second">
                <p>
                  <span>
                    <h4>Price : &#8377;{food.price}</h4>
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <form class="row g-3" onSubmit={addToCart}>
                    <div class="col-auto">
                      <input
                        type="number"
                        class="form-control"
                        id="addToCart"
                        placeholder="Enter Quantity..."
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                      />
                    </div>
                    <div class="col-auto">
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Add to Cart"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>

              {(() => {
                if (user) {
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Add Review"
                        onClick={navigateToAddReviewPage}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>

        <div class="col-sm-3 mt-2 admin">
          <GetFoodReviews />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <h2 className="text-color">Related Foods:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {foods.map((food) => {
              return <FoodCard item={food} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
