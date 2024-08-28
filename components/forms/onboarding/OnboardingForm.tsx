import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const OnboardingForm = () => {
  return (
    <form className="flex wrap gap-4 p-6">
      <Button className="size-36 flex flex-col text-primary" variant="outline">
        <Image
          className="fill-primary size-12"
          src="/images/teacher.svg"
          alt="teacher"
          width={48}
          height={48}
        />
        <span>Teacher</span>
      </Button>
      <Button className="size-36 flex flex-col text-primary" variant="outline">
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
