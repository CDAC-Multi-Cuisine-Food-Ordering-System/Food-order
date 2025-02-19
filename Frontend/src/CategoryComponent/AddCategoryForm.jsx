// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddCategoryForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

//   let navigate = useNavigate();

//   const saveCategory = (e) => {
//     let data = { name, description };

//     fetch("http://localhost:8080/api/category/add", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + admin_jwtToken,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((result) => {
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               navigate("/home");
//             }, 2000); // Redirect after 3 seconds
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 2000); // Redirect after 3 seconds
//           } else {
//             toast.error("It Seems Server is down!!!", {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 2000); // Redirect after 3 seconds
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 3 seconds
//       });
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <div class="mt-2 d-flex aligns-items-center justify-content-center">
//         <div
//           class="form-card border-color"
//           style={{ width: "25rem", boxShadow: "16px 7px 8px #D21369" }}
//         >
//           <div className="container-fluid">
//             <div
//               className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
//               style={{
//                 borderRadius: "1em",
//                 height: "38px",
//               }}
//             >
//               <h5 class="card-title">Add Category</h5>
//             </div>
//             <div class="card-body text-color1 mt-3">
//               <form>
//                 <div class="mb-3">
//                   <label for="title" class="form-label">
//                     <b>Category Title</b>
//                   </label>
//                   <input
//                     type="text"
//                     class="form-control"
//                     id="title"
//                     placeholder="enter title.."
//                     onChange={(e) => {
//                       setName(e.target.value);
//                     }}
//                     value={name}
//                   />
//                 </div>
//                 <div class="mb-3">
//                   <label for="description" class="form-label">
//                     <b>Category Description</b>
//                   </label>
//                   <textarea
//                     class="form-control"
//                     id="description"
//                     rows="3"
//                     placeholder="enter description.."
//                     onChange={(e) => {
//                       setDescription(e.target.value);
//                     }}
//                     value={description}
//                   />
//                 </div>

//                 <div className="d-flex aligns-items-center justify-content-center mb-2">
//                   <button
//                     type="submit"
//                     onClick={saveCategory}
//                     class="btn bg-color custom-bg-text"
//                   >
//                     Add Category
//                   </button>
//                 </div>

//                 <ToastContainer />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategoryForm;

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const AddCategoryForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const saveCategory = (e) => {
    e.preventDefault();

    const data = { name, description };

    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
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
              navigate("/home");
            }, 2000); // Redirect after 2 seconds
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
            }, 2000); // Reload after 2 seconds
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
            }, 2000); // Reload after 2 seconds
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
        }, 1000); // Reload after 1 second
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
        {/* <div
          className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
          style={{ borderRadius: "1em", height: "38px" }}
        >
          <h5 className="card-title">Add Category</h5>
        </div> */}
        <div className="card-header custom-bg-text mt-2 d-flex justify-content-center align-items-center">
          <h1 className="card-title">Add Category</h1>
        </div>
        <div className="card-body text-color1 mt-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                <b>Category Title</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title.."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <b>Category Description</b>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter description.."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <button
                type="submit"
                onClick={saveCategory}
                className="btn bg-color custom-bg-text"
              >
                Add Category
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddCategoryForm;
