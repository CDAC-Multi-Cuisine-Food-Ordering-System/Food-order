import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const AdminRegisterForm = () => {
  const navigate = useNavigate();

  const [registerRequest, setRegisterRequest] = useState({
    emailId: "",
    password: "",
  });

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAdmin = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/admin/register", {
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
              navigate("/home");
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
            }, 1000); // Redirect after 3 seconds
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
            }, 1000); // Redirect after 3 seconds
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
        background: "url('../images/bg_img.jpg') no-repeat",
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
          <h1 className="card-title">Register Admin</h1>
        </div>

        <div className="card-body mt-3">
          <form>
            <div className="mb-3 text-color1" style={{ position: "relative" }}>
              <input
                type="email"
                className="form-control"
                id="email"
                name="emailId"
                placeholder="Email Id"
                onChange={handleUserInput}
                value={registerRequest.emailId}
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
                placeholder="Password"
                onChange={handleUserInput}
                value={registerRequest.password}
                autoComplete="on"
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
            <div className="d-flex aligns-items-center justify-content-center">
              <button
                type="submit"
                className="btn bg-color custom-bg-text mb-2"
                onClick={registerAdmin}
              >
                Register
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRegisterForm;
