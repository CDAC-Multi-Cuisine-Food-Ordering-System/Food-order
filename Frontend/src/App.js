import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import DeliveryRegister from "./UserComponent/DeliveryRegister.jsx"
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";
import HomePage from "./PageComponent/HomePage";
import AddCategoryForm from "./CategoryComponent/AddCategoryForm";
import AddFoodForm from "./FoodComponent/AddFoodForm";
import Food from "./FoodComponent/Food";
import AddFoodReview from "./ReviewComponent/AddFoodReview";
import GetFoodReviews from "./ReviewComponent/GetFoodReviews";
import RestaurantFoods from "./FoodComponent/RestaurantFoods";
import ViewRestaurantFoods from "./FoodComponent/ViewRestaurantFoods";
import UpdateFoodForm from "./FoodComponent/UpdateFoodForm";
import ViewAllCategories from "./CategoryComponent/ViewAllCategories";
import UpdateCategoryForm from "./CategoryComponent/UpdateCategoryForm";
import ViewAllFoods from "./FoodComponent/ViewAllFoods";
import AddCardDetails from "./OrderComponent/AddCardDetails";
import ViewMyCart from "./CartComponent/ViewMyCart";
import ViewMyOrders from "./OrderComponent/ViewMyOrders";
import ViewAllOrders from "./OrderComponent/ViewAllOrders";
import ViewRestaurantDeliveryPerson from "./UserComponent/ViewRestaurantDeliveryPerson";
import ViewRestaurantOrders from "./OrderComponent/ViewRestaurantOrders";
import ViewAllRestaurants from "./UserComponent/ViewAllRestaurants";
import ViewAllDeliveryPersons from "./UserComponent/ViewAllDeliveryPersons";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import ViewDeliveryOrders from "./OrderComponent/ViewDeliveryOrders";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./NavbarComponent/theme/DarkTheme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/customer/register" element={<UserRegister />} />
        <Route path="/user/restaurant/register" element={<UserRegister />} />
        <Route path="/restaurant/delivery/register" element={<DeliveryRegister  />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/food/category/:categoryId/:categoryName"
          element={<HomePage />}
        />
        <Route path="/category/add" element={<AddCategoryForm />} />
        <Route path="/food/add" element={<AddFoodForm />} />
        <Route
          path="/food/:foodId/category/:categoryId"
          element={<Food />}
        />
        <Route
          path="/food/:foodId/review/add"
          element={<AddFoodReview />}
        />
        <Route path="/food/review/fetch" element={<GetFoodReviews />} />

        <Route
          path="/food/restaurant/:restaurantId/:restaurantName"
          element={<RestaurantFoods />}
        />
        <Route
          path="/food/restaurant/:restaurantId/:restaurantName/category/:categoryId/:categoryName"
          element={<RestaurantFoods />}
        />
        <Route path="/restaurant/food/all" element={<ViewRestaurantFoods />} />
        <Route path="/restaurant/food/update" element={<UpdateFoodForm />} />
        <Route path="/admin/category/all" element={<ViewAllCategories />} />
        <Route path="/admin/category/update" element={<UpdateCategoryForm />} />
        <Route path="/admin/food/all" element={<ViewAllFoods />} />
        <Route path="/customer/order/payment" element={<AddCardDetails />} />
        <Route path="/customer/cart" element={<ViewMyCart />} />
        <Route path="/customer/order" element={<ViewMyOrders />} />
        <Route path="/admin/order/all" element={<ViewAllOrders />} />
        <Route
          path="/restaurant/delivery-person/all"
          element={<ViewRestaurantDeliveryPerson />}
        />
        <Route path="/restaurant/order/all" element={<ViewRestaurantOrders />} />
        <Route path="/admin/restaurant/all" element={<ViewAllRestaurants />} />
        <Route
          path="/admin/delivery-person/all"
          element={<ViewAllDeliveryPersons />}
        />
        <Route path="/admin/customer/all" element={<ViewAllCustomers />} />
        <Route
          path="/delivery-person/order/all"
          element={<ViewDeliveryOrders />}
        />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
