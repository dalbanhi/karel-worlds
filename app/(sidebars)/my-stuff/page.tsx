import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Stuff",
  description:
    "A place to store your Karel Worlds puzzles and view your classes",
};

const MyDashboard = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/");
  }
  return (
    <section className="flex min-h-screen w-1/2 flex-col justify-start">
      <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
        {String(metadata.title ?? "Default Title")}
      </h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="account">My Puzzles</TabsTrigger>
          <TabsTrigger value="password">My Liked Puzzles</TabsTrigger>
          <TabsTrigger value="my-classes">My Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default MyDashboard;
