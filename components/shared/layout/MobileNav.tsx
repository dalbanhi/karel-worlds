"use client";
import React, { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { HamburgerMenuIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, buttonVariants } from "../../ui/button";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  interface DrawerLinkProps extends React.PropsWithChildren {
    href: string;
  }

  const DrawerLink: React.FC<DrawerLinkProps> = ({ href, children }) => {
    return (
      <div className="flex w-full justify-end p-2">
        <Link href={href} onClick={() => setOpen(false)}>
          <DrawerDescription className="text-lg text-muted-foreground hover:text-primary">
            {children}
          </DrawerDescription>
        </Link>
      </div>
    );
  };

  return (
    <nav className="flex grow items-center justify-end gap-2 md:hidden">
      <SignedOut>
        <SignInButton>
          <Button variant="default">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger aria-label="Menu">
          <HamburgerMenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex gap-2 ">
            <Link
              className="flex gap-2 "
              aria-label="Home"
              href="/"
              onClick={() => setOpen(false)}
            >
              <DrawerTitle>Home</DrawerTitle>
            </Link>
          </DrawerHeader>
          <SignedOut>
            <DrawerLink href="/sign-up">Sign Up</DrawerLink>
          </SignedOut>
          <DrawerLink href="/about">About</DrawerLink>
          <DrawerLink href="/explore">Explore</DrawerLink>
          <div className="flex w-full justify-end p-2">
            <Link
              className={
                "flex gap-1 " + buttonVariants({ variant: "gradient" })
              }
              href="/new-puzzle"
              passHref
            >
              <PlusIcon />
              <span>New Puzzle</span>
            </Link>
          </div>
          <DrawerFooter>{/* <SocialMediaIcons /> */}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default MobileNav;
