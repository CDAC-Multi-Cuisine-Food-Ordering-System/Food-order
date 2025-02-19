import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryNavigator = (category) => {
  const { restaurantId, restaurantName } = useParams();

  const navigate = useNavigate();

  const categoryNavigator = () => {
    if (restaurantId && restaurantId !== 0) {
      navigate(
        `/food/restaurant/${restaurantId}/${restaurantName}/category/${category.item.id}/${category.item.name}`,
        {
          state: { id: restaurantId, firstName: restaurantName },
        }
      );
    } else {
      navigate(`/food/category/${category.item.id}/${category.item.name}`);
    }
  };

  return (
    <b className="text-color" onClick={categoryNavigator}>
      <i>{category.item.name}</i>
    </b>
  );
};

export default CategoryNavigator;
