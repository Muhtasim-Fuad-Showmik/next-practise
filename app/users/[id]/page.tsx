import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  if (id > 10) notFound();
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;

export async function generateMetadata(): Promise<Metadata> {
  const user = await fetch("");

  return {
    title: "user.email",
    description: "user.description",
  };
}
