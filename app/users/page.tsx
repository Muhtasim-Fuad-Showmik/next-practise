import { link } from "fs";
import React from "react";
import UserTable from "./UserTable";

const UsersPage = async () => {
  return (
    <>
      <h1>User Page</h1>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}

      <UserTable />
    </>
  );
};

export default UsersPage;
