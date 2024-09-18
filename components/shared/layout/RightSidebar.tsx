import React from "react";
// import ProfileLink from "./ProfileLink";
// import TagsList from "./TagsList";
// import SocialLinks from "./SocialLinks";
// import PostNavigation from "./PostNavigation";
// import { getAllUserTags } from "~/lib/actions/posts";
// import { getSession } from "~/auth/auth";

const RightSidebar = async () => {
  //   const session = await getSession();
  //   if (!session) return null;
  //   const tags = await getAllUserTags(session.user.id);
  //   const tagsString = JSON.stringify(tags);
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4 max-md:hidden sm:flex">
      hello
      {/* <ProfileLink /> */}
      {/* <TagsList tags={tagsString} />
      <SocialLinks userID={session.user.id} />
      <PostNavigation /> */}
    </aside>
  );
};

export default RightSidebar;
