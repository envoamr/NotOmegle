"use client"

import { useState } from "react";
import Interests from "@components/Interests";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });

const Menu = ({ startChat }) => {
  const [clickedAlready, setClickedAlready] = useState(false)

  return (
    <div className="flex flex-col-reverse md:flex-col max-w-3xl space-y-10 mx-4">
      <div className="flex flex-col space-y-4">
        <p className="text-gray-300">
          You don&apos;t need an app to use NotOmegle on your phone or tablet!
          The web site works great on mobile.
        </p>
        <div className="flex justify-between items-center space-x-5">
          <div className="flex flex-col space-y-4">
            <p>
              NotOmegle is a great way to meet new friends. You are randomly
              paired with another person one-on-one. You can also add your
              interests, and NotOmegle will match you with someone who shares
              similar interests.
            </p>
            <p>
              To help you stay safe, chats are anonymous unless you tell someone
              who you are (not recommended!), and you can stop a chat at any
              time. Users are solely responsible for their behavior while using
              NotOmegle.
            </p>
          </div>
          <img
            src="https://www.omegle.com/static/standwithhk.jpeg"
            alt="stand with honk kong"
            width={287}
            height={150}
            className="hidden lg:block"
          />
        </div>
        <p className="text-bold">YOU MUST BE 18 OR OLDER TO USE OMEGLE.</p>
      </div>
      <hr />
      <div className="flex flex-col md:flex-row justify-around flex-shrink items-center space-y-4">
        {/* <Interests /> */}
        <button
          onClick={(e) => {e.target.style.background="gray"; setClickedAlready(true); startChat()}}
          disabled={clickedAlready}
          className={
            roboto.className +
            " px-4 py-3 bg-[#fff] text-[#050055] text-xl font-bold rounded-lg"
          }
          style={{
            background:
              "linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%)",
          }}
        >
          Start chatting
        </button>
      </div>
    </div>
  );
};

export default Menu;
