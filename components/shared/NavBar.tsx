import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import { sourceCodePro, montserrat } from "@/app/fonts";
import Image from "next/image";

import Link from "next/link";
const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary-foreground">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md p-1 hover:bg-accent"
          passHref
        >
          <div
            className={`${sourceCodePro.className} flex items-center justify-center text-2xl font-semibold`}
          >
            <Image
              src="/images/icon.svg"
              alt="Karel Worlds"
              width={55}
              height={55}
            />
            Karel Worlds
          </div>
        </Link>
        <span className="sr-only">Karel Worlds</span>

        <NavigationMenu className="hidden items-center justify-start gap-2 md:flex">
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
          {/* <Button asChild>
            <div className="flex gap-1">
              <PlusIcon />
              <Link href="/login">Login</Link>
            </div>
          </Button> */}
          <Link
            className={
              "flex gap-1 hover:bg-primary-foreground hover:text-primary hover:border hover:border-primary " +
              buttonVariants({ variant: "default" })
            }
            href="/login"
            passHref
          >
            <PlusIcon />
            New Puzzle
          </Link>
          <SignedOut>
            <div className="rounded-md bg-primary p-2 text-sm text-white hover:border hover:border-primary hover:bg-primary-foreground hover:text-primary">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
