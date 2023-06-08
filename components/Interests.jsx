"use client";

import { Inter, Saira_Condensed, Roboto } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const Interests = () => {
  const [nextInterest, setNextInterest] = useState("");
  const [interests, setInterests] = useState([]);

  function addInterest(e) {
    if (e.key === "Enter" && nextInterest.trim() !== "") {
      if (!interests.includes(nextInterest.trim().toLowerCase())) {
        setInterests([...interests, nextInterest.trim().toLowerCase()]);
        setNextInterest("");
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <p>Topics:</p>
      <div
        className={
          roboto.className +
          " space-x-2 p-2 bg-gray-100 text-black max-w-lg container mx-auto flex flex-wrap rounded-xl"
        }
      >
        {interests.map((interest) => {
          return (
            <span
              key={interest}
              onDoubleClick={(e) => {
                let tmp = interests.slice();
                tmp.splice(interests.indexOf(interest), 1);
                setInterests(tmp);
              }}
              className="p-2 m-1 bg-blue-400 rounded-full select-none"
            >
              {interest}
            </span>
          );
        })}
        <input
          type="text"
          placeholder="#tiktok, #bpd, ..."
          value={nextInterest}
          onChange={(e) => setNextInterest(e.target.value)}
          onKeyDown={addInterest}
          className={roboto.className + " focus:outline-none p-2 bg-gray-100 text-black"}
        />
      </div>
    </div>
  );
};

export default Interests;
