import { link } from "fs";
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    /**
     * If we don't want Next to cached response from the API, enable the config below, and disable the bottom.
     * Without the config, if Next assumes that the data is static, it will also generate a static HTML for the page
     * automatically instead of generating a dynamically generated HTML.
     */
    // cache: 'no-store'
    next: {
      revalidate: 10, // Revalidates response from the mentioned API after every 10 seconds.
    },
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>User Page</h1>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
