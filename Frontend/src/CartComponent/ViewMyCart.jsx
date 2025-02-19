import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewMyCart = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [carts, setCarts] = useState([]);
  const [cartAmount, setCartAmount] = useState("0.0");

  const [foodCart, setFoodCart] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCart = async () => {
      const allCart = await retrieveCart();
      if (allCart) {
        setCarts(allCart.carts);

        if (allCart.totalCartAmount) {
          setCartAmount(allCart.totalCartAmount);
        }
      }
    };

    getAllCart();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/cart/fetch?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCart = (cartId, e) => {
    const data = { id: cartId, userId: user.id };
    fetch("http://localhost:8080/api/cart/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
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
        }, 1000); // Redirect after 3 seconds
      });
  };

  const incrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity + 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
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
        }, 1000); // Redirect after 3 seconds
      });
  };

  const decrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity - 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
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
        }, 1000); // Redirect after 3 seconds
      });
  };

  const checkout = (e) => {
    e.preventDefault();

    if (carts === null || carts.length < 1) {
      toast.error("No Foods In Cart To Order!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    navigate("/customer/order/payment", {
      state: { priceToPay: cartAmount },
    });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Cart</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Food</th>
                  <th scope="col">Food Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/food/" + cart.food.image1
                          }
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{cart.food.name}</b>
                      </td>
                      <td>
                        <b>{cart.food.category.name}</b>
                      </td>
                      <td>
                        <b>{cart.food.restaurant.firstName}</b>
                      </td>
                      <td>
                        <b>{cart.food.price}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => decrementCart(cart)}
                          className="btn btn-sm bg-color custom-bg-text me-2"
                        >
                          -
                        </button>
                        <b>{cart.quantity}</b>
                        <button
                          onClick={() => incrementCart(cart)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteCart(cart.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer custom-bg">
          <div className="float-right">
            <div
              className="text-color me-2"
              style={{
                textAlign: "right",
              }}
            >
              <h5>Total Price: &#8377; {cartAmount}/-</h5>
            </div>

            <div className="float-end me-2">
              <button
                type="submit"
                className="btn custom-bg-text mb-3"
                style={{ backgroundColor: "#0c5177", color: "#fff" }}
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyCart;
