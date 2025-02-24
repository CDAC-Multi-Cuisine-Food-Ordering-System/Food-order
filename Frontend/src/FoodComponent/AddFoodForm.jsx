import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFoodForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const retrieveAllCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/fetch/all");
        if (response.data) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    retrieveAllCategories();
  }, []);

  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    restaurantId: "",
  });

  const handleInput = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const saveFood = async (e) => {
    e.preventDefault();

    if (!restaurant) {
      toast.error("Restaurant Id is missing!!!", { position: "top-center", autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    if (selectedImage1) formData.append("image1", selectedImage1);
    if (selectedImage2) formData.append("image2", selectedImage2);
    if (selectedImage3) formData.append("image3", selectedImage3);
    formData.append("name", food.name);
    formData.append("description", food.description);
    formData.append("price", food.price);
    formData.append("categoryId", food.categoryId);
    formData.append("restaurantId", restaurant.id);

    try {
      const response = await axios.post("http://localhost:8080/api/food/add", formData, {
        headers: { Authorization: "Bearer " + restaurant_jwtToken },
      });

      if (response.data.success) {
        toast.success(response.data.responseMessage, { position: "top-center", autoClose: 1000 });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(response.data.responseMessage, { position: "top-center", autoClose: 1000 });
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", { position: "top-center", autoClose: 1000 });
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div className="card form-card shadow-lg" style={{ width: "45rem" }}>
          <div className="container-fluid">
            <div className="card-header bg-color custom-bg-text mt-2 text-center" style={{ borderRadius: "1em", height: "45px" }}>
              <h5 className="card-title">Add Food</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3" onSubmit={saveFood}>
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label"><b>Food Title</b></label>
                  <input type="text" className="form-control" id="title" name="name" onChange={handleInput} value={food.name} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label"><b>Food Description</b></label>
                  <textarea className="form-control" id="description" name="description" rows="3" onChange={handleInput} value={food.description} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label"><b>Category</b></label>
                  <select name="categoryId" onChange={handleInput} className="form-control" required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label"><b>Food Price</b></label>
                  <input type="number" className="form-control" id="price" name="price" onChange={handleInput} value={food.price} required />
                </div>

                {/* Image Upload Section */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="col-md-6 mb-3">
                    <label htmlFor={`formFile${num}`} className="form-label"><b>Select {num} Image</b></label>
                    <input
                      className="form-control"
                      type="file"
                      id={`formFile${num}`}
                      onChange={(e) => {
                        if (num === 1) setSelectedImage1(e.target.files[0]);
                        if (num === 2) setSelectedImage2(e.target.files[0]);
                        if (num === 3) setSelectedImage3(e.target.files[0]);
                      }}
                      required
                    />
                  </div>
                ))}

                {/* Image Preview */}
                <div className="col-12">
                  {selectedImage1 && <img src={URL.createObjectURL(selectedImage1)} alt="Selected Image 1" className="preview-img" />}
                  {selectedImage2 && <img src={URL.createObjectURL(selectedImage2)} alt="Selected Image 2" className="preview-img" />}
                  {selectedImage3 && <img src={URL.createObjectURL(selectedImage3)} alt="Selected Image 3" className="preview-img" />}
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button type="submit" className="btn bg-color custom-bg-text">Add Food</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddFoodForm;
