import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    /**
     * If we don't want Next to cached response from the API, enable the config below, and disable the bottom.
     * Without the config, if Next assumes that the data is static, it will also generate a static HTML for the page
     * automatically instead of generating a dynamically generated HTML.
     */
    // cache: 'no-store'
    // next: {
    //   revalidate: 10, // Revalidates response from the mentioned API after every 10 seconds.
    // },
  });
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">User Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">User Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
