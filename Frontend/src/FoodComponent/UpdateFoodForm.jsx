import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FoodCarousel from "./FoodCarousel";

const UpdateFoodForm = () => {
  const location = useLocation();
  const food = location.state;

  const [categories, setCategories] = useState([]);

  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [updatedFood, setUpdatedFood] = useState({
    id: food.id,
    name: food.name,
    description: food.description,
    price: food.price,
    quantity: food.quantity,
    categoryId: food.categoryId,
    restaurantId: food.restaurantId,
  });

  const handleInput = (e) => {
    setUpdatedFood({ ...updatedFood, [e.target.name]: e.target.value });
  };

  const saveFood = (e) => {
    e.preventDefault();
    if (restaurant === null) {
      toast.error("Restaurant Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    fetch("http://localhost:8080/api/food/update/detail", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + restaurant_jwtToken,
      },
      body: JSON.stringify(updatedFood),
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
              navigate("/restaurant/food/all");
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
              navigate("/restaurant/food/all");
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
              navigate("/restaurant/food/all");
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
    e.preventDefault();
  };

  const updateFoodImage = (e) => {
    e.preventDefault();
    if (restaurant === null) {
      toast.error("Restaurant Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("id", food.id);

    axios
      .put("http://localhost:8080/api/food/update/image", formData, {
        headers: {
          Authorization: "Bearer " + restaurant_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/restaurant/food/all");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-sm-3 mt-2 admin">
          <div class="card form-card">
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
          <div class="card form-card">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 class="card-title">Update Food Details</h5>
              </div>
              <div class="card-body text-color">
                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label for="title" class="form-label">
                      <b>Food Title</b>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      name="name"
                      onChange={handleInput}
                      value={updatedFood.name}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="description" class="form-label">
                      <b>Food Description</b>
                    </label>
                    <textarea
                      class="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={updatedFood.description}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <b>Category</b>
                    </label>

                    <select
                      name="categoryId"
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => {
                        return (
                          <option value={category.id}> {category.name} </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label for="price" class="form-label">
                      <b>Food Price</b>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      name="price"
                      onChange={handleInput}
                      value={updatedFood.price}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn bg-color custom-bg-text"
                      onClick={saveFood}
                    >
                      Update Food
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 mt-2">
          <div class="card form-card">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 class="card-title">Update Food Image</h5>
              </div>
              <div class="card-body text-color">
                <form className="row">
                  <div className="mb-3">
                    <label for="formFile" class="form-label">
                      <b> Select 1st Image</b>
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      name="image1"
                      onChange={(e) => setSelectImage1(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label for="formFile" class="form-label">
                      <b> Select 2nd Image</b>
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      name="image2"
                      onChange={(e) => setSelectImage2(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label for="formFile" class="form-label">
                      <b> Select 3rd Image</b>
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      name="image3"
                      onChange={(e) => setSelectImage3(e.target.files[0])}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn bg-color custom-bg-text"
                      onClick={updateFoodImage}
                    >
                      Update Image
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodForm;
