import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const MyDashboard = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/");
  }
  return <div>MyDashboard</div>;
};

export default MyDashboard;
