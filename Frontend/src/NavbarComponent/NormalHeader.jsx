import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 d-flex align-items-center">
      {/* <li className="nav-item">
        <Link
          to="/user/restaurant/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color1 ">Restaurant Signup</b>
        </Link>
      </li> */}

      <li className="nav-item">
        <Link
          to="/user/customer/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color1">Signup</b>
          {/* <b className="text-color1"> Customer Signup</b> */}
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/login" className="nav-link active" aria-current="page">
          <IconButton>
            <PersonIcon className="mb-2" sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
