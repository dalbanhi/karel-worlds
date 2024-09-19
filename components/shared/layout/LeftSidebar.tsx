import React from "react";
import Image from "next/image";
import Link from "next/link";

const LeftSidebar = async () => {
  //   const session = await getSession();
  //   if (!session) return null;
  //   const allUserTags = (await getAllUserTags(session.user.id)) as string[];
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4 max-sm:hidden sm:flex">
      <Link className="mb-6 mt-4 flex gap-2" href={"/"}>
        <Image
          src="/icons/gitnote.svg"
          alt="GitNote"
          width={20}
          height={20}
        ></Image>
        <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
      </Link>
    </aside>
  );
};

export default LeftSidebar;
