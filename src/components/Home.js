import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setData(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1 px-10 py-10">
        <div className="flex justify-around bg-gray-400 font-bold py-3 rounded-md pr-24">
          <div className="text-center w-96">
            <h3>Name</h3>
          </div>
          <div className="text-center w-96">
            <h3>Email</h3>
          </div>
          <div className="text-center w-96">
            <h3>Address</h3>
          </div>
        </div>
        {data.map((user, indx) => (
          <div
            className="bg-gray-300 flex justify-around py-2 rounded-md"
            key={user.id}
          >
            <div className="text-center w-96">
              <p>{user.name}</p>
            </div>
            <div className="text-center w-96">
              <p>{user.email}</p>
            </div>
            <div className="text-center w-96">
              <p>
                {user.address.city} city / {user.address.street} st
              </p>
            </div>
            <div className="text-center bg-gray-400 rounded-md p-1 text-sm">
              <Link to="/tasks">
                <button
                  onClick={() => {
                    localStorage.setItem("useremail", user.email);
                    localStorage.setItem("username", user.name);
                  }}
                >
                  View Tasks
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
