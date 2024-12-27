"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { Inter, Saira_Condensed, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", adjustFontFallback: false });
const sairaCondensedBold = Saira_Condensed({
  weight: "700",
  subsets: ["latin"],
  display: "swap", adjustFontFallback: false
});
const sairaCondensed = Saira_Condensed({ weight: "400", subsets: ["latin"], display: "swap", adjustFontFallback: false });
const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap", adjustFontFallback: false });

const Chat = ({
  sendMessage,
  messages,
  matched,
  searching,
  userDisconnected,
  otherDisconnected,
  handleUnmatched,
  sendTypingStatus,
  otherTyping,
}) => {
  const [message, setMessage] = useState("");
  const [btnClicked, setBtnClicked] = useState(0);
  const btnRef = useRef(null);
  const typingTimeout = useRef(null);
  const [userTyping, setUserTyping] = useState(false);
  const [messagesEndRef, inView, entry] = useInView({})

  // keys used to navigate away from tab, dont register as user typing
  let keysToIgnore = ["Alt", "Tab", "Control", "Fn", "Shift", "Super", "CapsLock"]
  
  useEffect(() => {
    if (inView) {
      entry?.target?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, otherTyping]);

  useEffect(() => {
    if (!matched && !searching) btnRef.current.innerText = "Next";
  }, [matched, searching]);

  function handleKeyDown(e) {
    if (!keysToIgnore.includes(e.key) && !userTyping) {
      clearTimeout(typingTimeout.current);
      setUserTyping(true);
      sendTypingStatus(true);
    }
    
    // send message
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey && matched && message.trim() !== "") {
        setUserTyping(false);
        setBtnClicked(0);
        btnRef.current.innerText = "Skip";
        sendMessage(message.trim());
        setMessage("");
      }
    }
  }
  
  function handleKeyUp() {
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setUserTyping(false);
      sendTypingStatus(false);
    }, 2000);
  }
  
  function handleBtnClick() {
    if (matched) {
      if (btnClicked == 0) {
        setBtnClicked(1);
        btnRef.current.innerText = "Sure?";
      }
      if (btnClicked > 0) {
        setBtnClicked(0);
        btnRef.current.innerText = "Next";
        handleUnmatched(false, "user");
      }
    } else if (!searching) {
      btnRef.current.innerText = "Skip";
      handleUnmatched(true);
    } else if (searching) {
      btnRef.current.innerText = "Next";
      handleUnmatched(false, "self");
    }
  }

  return (
    <div className="flex flex-col h-full w-full justify-between md:mx-20 bg-transparent">
      {/* logs */}
      <div className=" grow flex flex-col space-y-4 p-4 md:overflow-auto justify-end md:justify-normal">
        {/* info */}
        {searching ? (
          <p className="text-gray-500">
            Looking for someone you can chat with...
          </p>
        ) : (
          (matched || userDisconnected || otherDisconnected) && (
            <div>
              <p>You&apos;re now connected to a stranger</p>
              {/* <p>Common interests: tiktok</p> */}
            </div>
          )
        )}
        {/* messages */}
        <div className={inter.className + " flex flex-col space-y-2"}>
          {messages.map((msg, index) => (
            <p key={index}>
              {msg.own ? (
                <span className="text-blue-300 font-bold">You: </span>
              ) : (
                <span className="text-red-400 font-bold">Stranger: </span>
              )}
              {msg.msg}
            </p>
          ))}
          {matched && otherTyping && (
            <p className="text-gray-500 font-bold text-sm">
              Stranger is typing...
            </p>
          )}
          {/* bottom */}
          {!matched && !searching && otherDisconnected && (
            <p className="text-gray-500 font-bold">Stranger has disconnected</p>
          )}
          {!matched && !searching && userDisconnected && (
            <p className="text-gray-500 font-bold">You have disconnected</p>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* textbox */}
      <div className="flex">
        <button
          ref={btnRef}
          onClick={handleBtnClick}
          className={
            roboto.className +
            " bg-[#FDE311] text-gray-900 px-4 w-32 h-14 text-lg font-bold"
          }
          style={{
            background:
              "linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%)",
          }}
        >
          Skip
        </button>
        <textarea
          placeholder="Say hi!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="w-full h-14 outline-none p-2 resize-none overflow-hidden overflow-x-hidden whitespace-nowrap bg-white text-black"
        ></textarea>
      </div>
    </div>
  );
};

export default Chat;
