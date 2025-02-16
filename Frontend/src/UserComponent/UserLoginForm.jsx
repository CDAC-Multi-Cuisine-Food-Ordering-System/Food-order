import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    // Your login action function remains unchanged

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              if (res.user.role === "Admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.jwtToken);
              } else if (res.user.role === "Customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("customer-jwtToken", res.jwtToken);
              } else if (res.user.role === "Restaurant") {
                sessionStorage.setItem(
                  "active-restaurant",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("restaurant-jwtToken", res.jwtToken);
              } else if (res.user.role === "Delivery") {
                sessionStorage.setItem(
                  "active-delivery",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("delivery-jwtToken", res.jwtToken);
              }
            }

            if (res.jwtToken !== null) {
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
                navigate("/home"); // Use navigate function from react-router-dom
                window.location.reload();
              }, 1000); // Redirect after 3 seconds
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
      });
    e.preventDefault();
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
        <div className="card-header  custom-bg-text mt-2 d-flex justify-content-center align-items-center">
          <h1 className="card-title">Login</h1>
        </div>

        <div className="card-body mt-3">
          <form>
            <div className="mb-3 text-color1" style={{ position: "relative" }}>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                placeholder="Email Id"
                onChange={handleUserInput}
                value={loginRequest.emailId}
              />
              <FaUser
                className="icon"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  color: "#333",
                }}
              />
            </div>
            <div className="mb-3 text-color1" style={{ position: "relative" }}>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={loginRequest.password}
                autoComplete="on"
                placeholder="Password"
              />
              <FaLock
                className="icon"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  color: "#333",
                }}
              />
            </div>

            <div className="mb-3 text-color1">
              <select
                className="form-select"
                name="role"
                onChange={handleUserInput}
                value={loginRequest.role}
              >
                <option value="">Select user type</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Delivery">Delivery Person</option>
              </select>
            </div>
            <div className="d-flex aligns-items-center justify-content-center mb-2">
              <motion.button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={loginAction}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Login
              </motion.button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default UserLoginForm;
