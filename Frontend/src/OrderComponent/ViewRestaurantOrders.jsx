import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewRestaurantOrders = () => {
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  const [orders, setOrders] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const [allDelivery, setAllDelivery] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllOrders();
    getAllUsers();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/restaurant-wise?restaurantId=" +
        restaurant.id,
      {
        headers: {
          Authorization: "Bearer " + restaurant_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/restaurant/delivery-person?restaurantId=" +
        restaurant.id,
      {
        headers: {
          Authorization: "Bearer " + restaurant_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch?orderId=" + orderId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  const assignDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const assignToDelivery = (orderId, e) => {
    let data = { orderId: assignOrderId, deliveryId: deliveryPersonId };

    fetch("http://localhost:8080/api/order/assign/delivery-person", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + restaurant_jwtToken,
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
          <h2>Restaurant Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <form class="row g-3">
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Enter Order Id..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn bg-color custom-bg-text mb-3"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Food</th>
                  <th scope="col">Food Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Order Time</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Contact</th>
                  <th scope="col">Delivery Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr>
                      <td>
                        <b>{order.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/food/" +
                            order.food.image1
                          }
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{order.food.name}</b>
                      </td>
                      <td>
                        <b>{order.food.category.name}</b>
                      </td>
                      <td>
                        <b>{order.food.restaurant.firstName}</b>
                      </td>
                      <td>
                        <b>{order.food.price}</b>
                      </td>
                      <td>
                        <b>{order.quantity}</b>
                      </td>
                      <td>
                        <b>{order.user.firstName}</b>
                      </td>

                      <td>
                        <b>{formatDateFromEpoch(order.orderTime)}</b>
                      </td>
                      <td>
                        <b>{order.status}</b>
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b>{order.deliveryPerson.firstName}</b>;
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b>{order.deliveryPerson.phoneNo}</b>;
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryDate) {
                            return (
                              <b>
                                {order.deliveryDate + " " + order.deliveryTime}
                              </b>
                            );
                          } else {
                            return <b className="text-danger">Processing</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b>Delivery Assigned</b>;
                          } else {
                            return (
                              <button
                                className="btn btn-sm bg-color custom-bg-text ms-2"
                                variant="primary"
                                onClick={() => assignDelivery(order.orderId)}
                              >
                                Assign Delivery
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Assign To Delivery Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Order Id</b>
                </label>
                <input type="text" class="form-control" value={assignOrderId} />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Delivery Person</b>
                </label>

                <select
                  name="deliveryPersonId"
                  onChange={(e) => setDeliveryPersonId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Delivery Person</option>

                  {allDelivery.map((delivery) => {
                    return (
                      <option value={delivery.id}>
                        {delivery.firstName + " " + delivery.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => assignToDelivery(assignOrderId)}
                  class="btn bg-color custom-bg-text"
                >
                  Assign
                </button>
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewRestaurantOrders;
