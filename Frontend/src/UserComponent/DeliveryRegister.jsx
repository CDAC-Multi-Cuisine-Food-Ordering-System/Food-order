import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const [user, setUser] = useState({
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

  useEffect(() => {
    if (document.URL.indexOf("customer") != -1) {
      user.role = "Customer";
    } else if (document.URL.indexOf("delivery") != -1) {
      user.role = "Delivery";
    } else if (document.URL.indexOf("restaurant") != -1) {
      user.role = "Restaurant";
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    let jwtToken;

    if (user.role === "Delivery") {
      user.restaurantId = restaurant.id;
      // jwtToken = sessionStorage.getItem("restaurant-jwtToken"); // Use bank's JWT token for customer register
    }

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(user),
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
              navigate("/restaurant/delivery-person/all");
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex   aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color "
          // style={{ width: "50rem", boxShadow: "16px 7px 8px #D21369" }}
          style={{
            width: "50rem",
            boxShadow: "0 0 10px rgba(255,255,0,.2)",
            background: "transparent",
            border: "2px solid rgba(255,255,255,.2)",
          }}
        >
          <div className="container-fluid">
            <div
              className="card-header  custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              {/* <h1 className="card-title">Register</h1> */}
              <div className="card-header  custom-bg-text mt-2 d-flex justify-content-center align-items-center">
                <h1 className="card-title">Register</h1>
              </div>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="title" className="form-label">
                    <b>First Name</b>
                  </label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                    placeholder="First Name"
                  />
                </div>

                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="title" className="form-label">
                    <b>Last Name</b>
                  </label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                    placeholder="Last Name"
                  />
                </div>

                <div className="col-md-6 mb-3 text-color1">
                  {/* <b>
                    <label className="form-label">Email Id</label>
                  </b> */}
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                    placeholder="Email Id"
                  />
                </div>
                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="quantity" className="form-label">
                    <b>Password</b>
                  </label> */}
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                    placeholder="Password"
                  />
                </div>

                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="contact" className="form-label">
                    <b>Contact No</b>
                  </label> */}
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                    placeholder="Contact No."
                  />
                </div>

                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="description" className="form-label">
                    <b> Street</b>
                  </label> */}
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                    placeholder="Street"
                  />
                </div>
                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="price" className="form-label">
                    <b>City</b>
                  </label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                    placeholder="City"
                  />
                </div>
                <div className="col-md-6 mb-3 text-color1">
                  {/* <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label> */}
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                    placeholder="Pincode"
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
