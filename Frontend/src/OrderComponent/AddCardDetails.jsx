import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const priceToPay = location.state.priceToPay; // Assuming priceToPay is passed via state
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      toast.error("Failed to load Razorpay. Please try again.", {
        position: "top-center",
      });
      return;
    }

    const options = {
      key: "rzp_test_9C5DF9gbJINYTA", // Replace with your Razorpay key
      amount: priceToPay * 100, // Convert to paisa
      currency: "INR",
      name: "Multi Food Delivery",
      description: "Order Payment",
      image: "/path/to/your-logo.png", // Optional: Add your logo here
      handler: async function (response) {
        // Handle payment success
        const paymentData = {
          userId: user.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        fetch("http://localhost:8080/api/order/add?userId=" + user.id, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + customer_jwtToken,
          },
          body: JSON.stringify(paymentData),
        })
          .then((result) => result.json())
          .then((res) => {
            if (res.success) {
              toast.success(res.responseMessage, { position: "top-center" });
              setTimeout(() => navigate("/home"), 2000);
            } else {
              toast.error(res.responseMessage, { position: "top-center" });
            }
          })
          .catch(() => {
            toast.error("Server error. Please try again.", {
              position: "top-center",
            });
          });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contactNumber,
      },
      theme: {
        color: "#0c5177",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mt-2 d-flex align-items-center justify-content-center">
      <div className="card form-card border-color" style={{ width: "25rem" }}>
        <div className="card-header bg-color custom-bg-text">
          <h5 className="card-title text-center">Payment Details</h5>
        </div>
        <div className="card-body text-color custom-bg">
          <button
            className="btn custom-bg-text bg-color"
            style={{ backgroundColor: "#0c5177", color: "#fff" }}
            onClick={handleRazorpayPayment}
          >
            Pay Rs {priceToPay}
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;

