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

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  interface DrawerLinkProps extends React.PropsWithChildren {
    href: string;
  }

  const DrawerLink: React.FC<DrawerLinkProps> = ({ href, children }) => {
    return (
      <div className="flex w-full justify-end p-2">
        <Link href={href} onClick={() => setOpen(false)}>
          <DrawerDescription className="text-lg text-muted-foreground hover:text-primary-foreground">
            {children}
          </DrawerDescription>
        </Link>
      </div>
    );
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label="Menu"
        className="flex md:hidden grow justify-end"
      >
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
        <DrawerLink href="/about">About</DrawerLink>
        <DrawerLink href="/explore">Explore</DrawerLink>

        <DrawerFooter>{/* <SocialMediaIcons /> */} footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
