import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllFoods = () => {
  const [allFoods, setAllFoods] = useState([]);

  useEffect(() => {
    const getAllFoods = async () => {
      const allFoods = await retrieveAllFoods();
      if (allFoods) {
        setAllFoods(allFoods.foods);
      }
    };

    getAllFoods();
  }, []);

  const retrieveAllFoods = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Foods</h2>
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
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>

                  <th scope="col">Price</th>
                  <th scope="col">Restaurant</th>
                </tr>
              </thead>
              <tbody>
                {allFoods.map((food) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={"http://localhost:8080/api/food/" + food.image1}
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{food.name}</b>
                      </td>
                      <td>
                        <b>{food.description}</b>
                      </td>
                      <td>
                        <b>{food.category.name}</b>
                      </td>

                      <td>
                        <b>{food.price}</b>
                      </td>
                      <td>
                        <b>{food.restaurant.firstName}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllFoods;
