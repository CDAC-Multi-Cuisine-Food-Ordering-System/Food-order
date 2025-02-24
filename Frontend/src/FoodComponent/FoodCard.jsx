import { Link } from "react-router-dom";
import CategoryNavigator from "../CategoryComponent/CategoryNavigator";

const FoodCard = ({ item }) => {
  // Retrieve the active customer data from sessionStorage
  const activeCustomer = sessionStorage.getItem("active-customer");

  // Check if a customer is logged in
  const isActiveCustomer = activeCustomer !== null;

  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <div className="card food-card rounded-card h-100 shadow-lg">
        <img
          src={"http://localhost:8080/api/food/" + item.image1}
          className="card-img-top rounded"
          alt="img"
          style={{
            maxHeight: "300px",
            margin: "0 auto",
          }}
        />

        <div className="card-body text-color">
          <h5>
            Category:{" "}
            <CategoryNavigator
              item={{
                id: item.category.id,
                name: item.category.name,
              }}
            />
          </h5>
          <h5 className="card-title d-flex justify-content-between text-color-second">
            <div>
              <b>{item.name}</b>
            </div>
          </h5>
          <p className="card-text">
            <b>{descriptionToShow(item.description, 50)}</b>
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between mt-2">
            {isActiveCustomer ? (
              <Link
                to={`/food/${item.id}/category/${item.category.id}`}
                className="btn bg-color custom-bg-text"
              >
                Add to Cart
              </Link>
            ) : (
              <button
                className="btn bg-color custom-bg-text"
                disabled
                title="Only active customers can add items to the cart"
              >
                Add to Cart (Disabled)
              </button>
            )}
            <div className="text-color-second">
              <p>
                <span>
                  <h4>Price : &#8377;{item.price}</h4>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

