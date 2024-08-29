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

  //   clerkUserId: clerkUser.id,
  //   name: clerkUser.fullName,
  //   imageUrl: clerkUser.imageUrl,
  //   email: clerkUser.emailAddresses[0].emailAddress,
  //   role: data.role,
  //   onboardingComplete: true,
  // },

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
    <div className="w-96 flex flex-col border rounded-sm align-stretch justify-start max-w shadow-2xl p-10">
      <div className="w-full">
        <div className="flex flex-col items-stretch justify-start">
          <div className="flex items-center justify-center">
            <Image src="/images/icon.svg" alt="logo" width={48} height={48} />
          </div>
          <h1 className="text-xl font-semibold text-center">
            Welcome to Karel Worlds, {clerkUser.firstName}!
          </h1>
          <p className="text-primary text-xs text-center">
            {" "}
            Please select your primary role below
          </p>
        </div>
        <OnboardingForm baseUserInfo={baseUserInfo} />
      </div>
    </div>
  );
};

export default OnboardingPage;
