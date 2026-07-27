import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-4">
          Your feed is on vacation! 😴
        </h1>
        <p className="text-gray-400">
          Looks like there are no more profiles to show.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-2">
      <h1 className="text-4xl font-semibold mb-4">Discover</h1>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
