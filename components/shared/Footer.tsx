import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-accent-semi">
      <div className="flex w-full justify-center gap-10 p-2">
        <Link className="link_underline" href="/contact">
          Questions or Bugs?
        </Link>
        <Link className="link_underline " href="/contribute">
          Contribute!
        </Link>
        <Link className="link_underline " href="/terms-of-service">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
