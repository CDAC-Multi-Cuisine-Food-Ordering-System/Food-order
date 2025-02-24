import FoodCard from "./FoodCard";
import { useAuth } from "../context/AuthContext"; // Assuming you're using AuthContext

const FoodList = ({ foodItems }) => {
  const { user } = useAuth(); // Check the user status

  // Determine if the user is an active customer
  const isActiveCustomer = user && user.role === "active-customer";

  return (
    <div className="row">
      {foodItems.map((item) => (
        <FoodCard key={item.id} item={item} isActiveCustomer={isActiveCustomer} />
      ))}
    </div>
  );
};

export default FoodList;
