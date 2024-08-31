import Image from "next/image";

import { getCurrentUser } from "@/lib/auth/checkUser";
import { redirect } from "next/navigation";

export default async function Home() {
  // const myCurrentUser = await getCurrentUser();
  // if (myCurrentUser?.onboardingComplete) {
  //   redirect("/my-stuff");
  // }
  return (
    <section className="flex flex-col items-center justify-between">
      <h1>hello</h1>
    </section>
  );
}
