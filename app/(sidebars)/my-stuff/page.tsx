import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { montserrat } from "@/app/fonts";

import React from "react";

const MyDashboard = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/");
  }
  return (
    <section className="flex min-h-screen flex-col justify-start p-4 max-sm:w-full md:w-6/12">
      <div className="flex w-full justify-center bg-accent">
        <h1
          className={`bg-accent/50 p-2 text-center text-5xl font-bold md:text-2xl ${montserrat.className}`}
        >
          My Stuff
        </h1>
      </div>
    </section>
  );
};

export default MyDashboard;
