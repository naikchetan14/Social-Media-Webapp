import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../components/User/User";
import { Link } from "react-router-dom";

const Search = () => {
  const { users } = useSelector((store) => store.user);
  const [userList, setUserList] = useState([...users]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (query !== "") {
      let newList = users.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log("newList", newList);
      setUserList(newList);
    } else {
      setUserList(users);
    }
  }, [query]);
  return (
    <div className="container mx-auto px-4 bg-gradient-to-b from-violet-600 to-red-600 min-h-[calc(100vh-67.2px)]">
      <div className="grid grid-cols-1 items-center gap-4 w-[100%] md:w-[70%] mx-auto">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search User..."
            className="w-full mt-6 border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          {userList &&
            userList.length > 0 &&
            userList.map((user) => (
              <Link to={`profile/${user._id}`}>
                <User user={user} imageSrc={null}></User>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
