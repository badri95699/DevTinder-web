import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="text-bold text-white text-3xl text-center font-semibold my-10"> No Connections yet!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-white text-3xl font-semibold">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div className=" flex justify-between items-center m-4 p-4 rounded-lg bg-slate-800 w-1/2 mx-auto " key={_id}>
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-top object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-6 flex-1">
              <h2 className="font-semibold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + _id}><button className="btn btn-primary">Chat</button></Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;