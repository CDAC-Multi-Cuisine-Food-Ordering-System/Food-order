import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLogOut } from "react-icons/fi";

const RestaurantHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-restaurant"));
  console.log(user);

  const restaurantLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-restaurant");
    sessionStorage.removeItem("restaurant-jwtToken");
    
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000); // Redirect after 3 seconds
  };
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/restaurant/order/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color1">Restaurant Orders</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/restaurant/delivery/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color1">Register Delivery</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/restaurant/delivery-person/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color1">View Delivery Persons</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/food/add" class="nav-link active" aria-current="page">
          <b className="text-color1">Add Food</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/restaurant/food/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color1">View My Foods</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={restaurantLogout}
        >
          <b>
            <FiLogOut color="#fff" style={{ fontSize: "1.5rem" }} />
          </b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default RestaurantHeader;
