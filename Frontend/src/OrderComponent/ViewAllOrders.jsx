import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([])

  const [orderId, setOrderId] = useState('')
  const [tempOrderId, setTempOrderId] = useState('')
  const admin_jwtToken = sessionStorage.getItem('admin-jwtToken')

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders
      if (orderId) {
        allOrders = await retrieveOrdersById()
      } else {
        allOrders = await retrieveAllorders()
      }

      if (allOrders) {
        setOrders(allOrders.orders)
      }
    }

    getAllOrders()
  }, [orderId])

  const retrieveAllorders = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/order/fetch/all',
      {
        headers: {
          Authorization: 'Bearer ' + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    )
    console.log(response.data)
    return response.data
  }

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/order/fetch?orderId=' + orderId
    )
    console.log(response.data)
    return response.data
  }

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime))
    const formattedDate = date.toLocaleString() // Adjust the format as needed

    return formattedDate
  }

  const searchOrderById = (e) => {
    e.preventDefault()
    setOrderId(tempOrderId)
  }

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: '40rem',
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: '1em',
            height: '50px',
          }}
        >
          <h2>All Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: 'auto',
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
                            'http://localhost:8080/api/food/' +
                            order.food.image1
                          }
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: '90px',
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
                            return <b>{order.deliveryPerson.firstName}</b>
                          } else {
                            return <b className="text-danger">Pending</b>
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b>{order.deliveryPerson.phoneNo}</b>
                          } else {
                            return <b className="text-danger">Pending</b>
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryDate) {
                            return (
                              <b>
                                {order.deliveryDate + ' ' + order.deliveryTime}
                              </b>
                            )
                          } else {
                            return <b className="text-danger">Pending</b>
                          }
                        })()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAllOrders
