import React from "react";
import SimpleHero from "@/components/shared/SimpleHero";
import contactHeroImage from "@/public/images/hero/contact/contact.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact us with any questions or feedback you have about Karel Worlds. We'd love to hear from you!",
};

const ContactPage = () => {
  return (
    <div className="flex flex-col">
      <SimpleHero image={contactHeroImage} text="Contact Us" />
      <article className="prose prose-slate mt-2">
        <h2 className="text-center text-xl">Contact Us</h2>
        <p>
          If you have any questions or feedback, please feel free to drop us a
          line using the form below!
        </p>
      </article>
      {/* <ContactForm /> */}
    </div>
  );
};

export default ContactPage;
