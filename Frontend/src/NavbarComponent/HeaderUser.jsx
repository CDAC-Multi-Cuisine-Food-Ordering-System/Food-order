import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { FiLogOut } from "react-icons/fi";

const HeaderUser = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000); // Redirect after 3 seconds
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5 d-flex align-items-center">
      <li class="nav-item">
        <Link to="/customer/cart" class="nav-link active" aria-current="page">
          <b className="text-color1">My Cart</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/customer/order" class="nav-link active" aria-current="page">
          <b className="text-color1">My Order</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
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

export default HeaderUser;
