import Image from "next/image";

import { getCurrentUser } from "@/lib/auth/checkUser";
import { redirect } from "next/navigation";
import HeroDesktop from "@/components/shared/home/hero/HeroDesktop";
import HeroMobile from "@/components/shared/home/hero/HeroMobile";

export default async function Home() {
  const myCurrentUser = await getCurrentUser();
  if (myCurrentUser?.onboardingComplete) {
    redirect("/my-stuff");
  }
  return (
    <section className="flex flex-col items-center justify-between">
      <HeroDesktop />
      <HeroMobile />
    </section>
  );
}
