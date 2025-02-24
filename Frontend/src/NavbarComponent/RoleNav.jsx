import AdminHeader from "./AdminHeader";
import DeliveryHeader from "./DeliveryHeader";

import HeaderUser from "./HeaderUser";
import NormalHeader from "./NormalHeader";
import RestaurantHeader from "./RestaurantHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  if (user != null) {
    return <HeaderUser />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (restaurant != null) {
    return <RestaurantHeader />;
  } else if (deliveryPerson != null) {
    return <DeliveryHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
