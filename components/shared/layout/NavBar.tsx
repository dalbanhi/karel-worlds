"use client";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  SignInButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import { sourceCodePro, montserrat } from "@/app/fonts";
import Image from "next/image";

import Link from "next/link";

import MobileNav from "./MobileNav";

const DesktopNav = () => {
  return (
    <div className="hidden grow justify-between md:flex ">
      <NavigationMenu className="flex items-center justify-start gap-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span
                  className={`text-lg font-semibold ${montserrat.className}`}
                >
                  About
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/explore" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span
                  className={`text-lg font-semibold ${montserrat.className}`}
                >
                  Explore
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        <Link
          className={
            "flex gap-1 group " + buttonVariants({ variant: "gradient" })
          }
          href="/new-puzzle"
          passHref
        >
          <PlusIcon />
          <span>New Puzzle</span>
        </Link>
        <SignedOut>
          <SignUpButton />
          <SignInButton>
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <header className="sticky top-0 z-100 w-full border-b border-border bg-primary-foreground">
      <div className="container mx-auto flex h-16 min-w-max items-center justify-start px-4 ">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md p-1 hover:bg-accent"
          passHref
        >
          <div
            className={`${sourceCodePro.className} flex w-full items-center justify-center text-lg font-semibold md:text-2xl`}
          >
            <Image
              src="/images/icon.svg"
              alt="Karel the Robot, the logo for Karel Worlds"
              width={55}
              height={55}
            />
            <h1 className="w-full whitespace-nowrap text-ring">Karel Worlds</h1>
          </div>
        </Link>
        <span className="sr-only">Karel Worlds</span>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default NavBar;
