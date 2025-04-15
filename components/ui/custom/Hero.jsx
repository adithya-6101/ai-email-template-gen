import React from "react";
import { Button } from "../button";
import SignInButton from "./SignInButton";

function Hero() {
  return (
    <div
      className="px-10 md:px-28 lg:px-44 xl:px-56
    flex flex-col items-center mt-24"
    >
      <h2 className="font-bold text-5xl text-center ">
        AI-Powered <span className="text-primary"> Email Templates </span>
      </h2>
      <p className="text-center mt-4">
        Design emails effortlessly with this AI-powered builder. Simply describe
        your idea and watch it turn into a ready-to-use template — fast,
        customizable, and no coding needed.
      </p>
      <div className="flex gap-5 mt-6">
        <SignInButton></SignInButton>
        <Button variant="outline">Try Demo</Button>
      </div>
    </div>
  );
}

export default Hero;
