import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-slate-800 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {" "}
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Badri"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Gupta"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label my-1">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="example@gmail.com"
                 autoComplete="username"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label my-1">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                autoComplete={isLoginForm ? "current-password" : "new-password"}
              />
            </label>

            <p className="text-red-500 font-semibold">{error}</p>

            <div className="card-actions justify-center m-2">
              <button type="submit" className="btn btn-primary">
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;