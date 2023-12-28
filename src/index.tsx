import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryBrowser,
  Navigate,
} from "react-router-dom";
import { store } from "./redux/configStore";
import Home from "./pages/Home/Home";
import { history } from "./utils/lib/libs";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Login from "./pages/Login/Login";
import "./assets/scss/style.scss";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Register from "./pages/Register/Register";
import Loading from "./components/Loading/Loading";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";
import ManageTemplate from "./templates/ManageTemplate/ManageTemplate";
import ManageUser from "./pages/ManageUser/ManageUser";
import ManageFilm from "./pages/ManageFilm/ManageFilm";
import EditUser from "./pages/EditUser/EditUser";
import AddUser from "./pages/AddUser/AddUser";
import EditFilm from "./pages/EditFilm/EditFilm";
import AddFilm from "./pages/AddFlim/AddFilm";
import Showtime from "./pages/Showtime/Showtime";
import News from "./pages/News/News";
import Review from "./pages/Review/Review";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Loading />
    <HistoryBrowser history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="news">
            <Route path=":id" element={<News />}></Route>
          </Route>
          <Route path="review">
            <Route path=":id" element={<Review />}></Route>
          </Route>
        </Route>
        <Route path="" element={<UserTemplate />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="checkout">
          <Route path=":id" element={<CheckoutTemplate />}></Route>
        </Route>
        <Route path="manage" element={<ManageTemplate />}>
          <Route path="manageUser" element={<ManageUser />}></Route>
          <Route path="manageUser/editUser/:account" element={<EditUser />}></Route>
          <Route path="manageUser/addUser" element={<AddUser />}></Route>
          <Route path="manageFilm" element={<ManageFilm />}></Route>
          <Route path="manageFilm/addFilm" element={<AddFilm />}></Route>
          <Route path="manageFilm/editFilm/:idFilm" element={<EditFilm />}></Route>
          <Route path="manageFilm/showtime/:idFilm" element={<Showtime />}></Route>
        </Route>
        <Route path="*" element={<Navigate to={'/'}/>}></Route>
      </Routes>
    </HistoryBrowser>
  </Provider>
);

reportWebVitals();
