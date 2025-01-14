import { link } from "fs";
import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>User Page</h1>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}

      <Link href={"/users/new"} className="btn">
        New User
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
