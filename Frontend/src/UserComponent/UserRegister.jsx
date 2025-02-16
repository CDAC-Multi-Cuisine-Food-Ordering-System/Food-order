import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";

const UserRegisterForm = () => {
  const navigate = useNavigate();

  const [registerRequest, setRegisterRequest] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAction = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerRequest),
    })
      .then((result) => {
        console.log("result", result);
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
              navigate("/user/login");
            }, 1000);
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
            }, 1000);
          } else {
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
            }, 1000);
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
        }, 1000);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: "20%",
        left: "35%",
        transform: "translate(-50%, -50%)",
        width: "420px",
        background: 'url("../images/bg_img.jpg") no-repeat',
        border: "2px solid rgba(255, 255, 255, .2)",
        backdropFilter: "blur(30px)",
        boxShadow: "0 0 10px rgba(255, 255, 0, .2)",
        color: "#fff",
        borderRadius: "10px",
        padding: "30px 40px",
      }}
    >
      <div className="container-fluid">
        <div className="card-header custom-bg-text mt-2 d-flex justify-content-center align-items-center">
          <h1 className="card-title">Register</h1>
        </div>

        <div className="card-body mt-3">
          <form>
            <div className="row mb-3 text-color1">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleUserInput}
                  value={registerRequest.firstName}
                  autoComplete="false"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleUserInput}
                  value={registerRequest.lastName}
                  autoComplete="false"
                />
              </div>
            </div>
            <div className="mb-3 text-color1">
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                placeholder="Email Id"
                onChange={handleUserInput}
                value={registerRequest.emailId}
              />
            </div>
            <div className="mb-3 text-color1">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleUserInput}
                value={registerRequest.password}
              />
            </div>
            <div className="mb-3 text-color1">
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                placeholder="Phone Number"
                onChange={handleUserInput}
                value={registerRequest.phoneNo}
              />
            </div>
            <div className="row mb-3 text-color1">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  placeholder="Street"
                  onChange={handleUserInput}
                  value={registerRequest.street}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="City"
                  onChange={handleUserInput}
                  value={registerRequest.city}
                />
              </div>
            </div>
            <div className="mb-3 text-color1">
              <input
                type="number"
                className="form-control"
                id="pincode"
                name="pincode"
                placeholder="Pincode"
                onChange={handleUserInput}
                value={registerRequest.pincode}
              />
            </div>
            <div className="mb-3 text-color1">
              <select
                className="form-select"
                id="role"
                name="role"
                onChange={handleUserInput}
                value={registerRequest.role}
              >
                <option value="">Select Role</option>
                <option value="Customer">Customer</option>
                {/* <option value="Delivery">Delivery</option> */}
                <option value="Restaurant">Restaurant</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn bg-color custom-bg-text"
                onClick={registerAction}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default UserRegisterForm;
