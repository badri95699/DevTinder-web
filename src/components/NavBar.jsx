import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-slate-900 shadow-sm border-slate-700 ">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl border-slate-600" to={!user ? "/login" : "/"}>
          DevTinder 🧑🏻‍💻
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 mx-5 items-center ">
          <div className="font-semibold">Hello, {user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <img alt="user photo" src={user.photoUrl} className="object-top object-cover" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
