"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/validators/onboarding.schema";
import { createUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  baseUserInfo: {
    clerkUserId: string;
    name: string | null;
    imageUrl: string;
    email: string;
  };
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ baseUserInfo }) => {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: "",
      name: baseUserInfo.name,
      email: baseUserInfo.email,
      imageUrl: baseUserInfo.imageUrl,
      clerkUserId: baseUserInfo.clerkUserId,
    },
  });

  const onSubmit = async (data: any) => {
    await createUser(data);
    router.push("/my-stuff");
  };

  const handleRoleSubmit = (role: "TEACHER" | "STUDENT") => {
    setValue("role", role, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  return (
    <form className="flex wrap gap-4 p-6">
      <Button
        className="size-36 flex flex-col text-primary"
        variant="outline"
        type="button"
        onClick={() => handleRoleSubmit("TEACHER")}
      >
        <Image
          className="fill-primary size-12"
          src="/images/teacher.svg"
          alt="teacher"
          width={48}
          height={48}
        />
        <span>Teacher</span>
      </Button>
      <Button
        className="size-36 flex flex-col text-primary"
        variant="outline"
        type="button"
        onClick={() => handleRoleSubmit("STUDENT")}
      >
        <Image
          className="fill-primary size-12"
          src="/images/student.svg"
          alt="student"
          width={48}
          height={48}
        />
        <span>Student</span>
      </Button>
    </form>
  );
};

export default OnboardingForm;
