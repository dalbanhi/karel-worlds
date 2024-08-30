import React from "react";
import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/auth/checkUser";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const baseUserInfo = {
    clerkUserId: clerkUser.id,
    name: clerkUser.fullName || null,
    imageUrl: clerkUser.imageUrl,
    email: clerkUser.emailAddresses[0].emailAddress,
  };

  const myCurrentUser = await getCurrentUser();
  if (myCurrentUser?.onboardingComplete) {
    redirect("/my-stuff");
  }

  return (
    <div className="w-96 flex flex-col border rounded-md align-stretch justify-start max-w shadow-2xl p-10">
      <div className="w-full">
        <div className="flex flex-col items-stretch justify-start p-4">
          <div className="flex items-center justify-center">
            <Image src="/images/icon.svg" alt="logo" width={48} height={48} />
          </div>
          <h1 className="text-xl font-semibold text-center">
            Welcome to Karel Worlds,{" "}
            <span className="text-primary">
              {clerkUser.firstName !== null ? clerkUser.firstName : "Explorer"}
            </span>
            !
          </h1>
          <p className=" text-xs text-center text-primary">
            Pick a username and your role below to get started
          </p>
        </div>
        <OnboardingForm baseUserInfo={baseUserInfo} />
      </div>
    </div>
  );
};

export default OnboardingPage;
