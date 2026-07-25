/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) {
        navigate("/login");
      } else {
        // can make a error page here 
        // if some other type of error came
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
