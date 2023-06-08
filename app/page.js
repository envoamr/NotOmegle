"use client"
import { useState, useEffect, useCallback } from 'react'
import Header from "@components/Header";
import Footer from "@components/Footer";
import Menu from "@components/Menu";
import Chat from "@components/Chat";

const URL = "wss://twgrzhk5gf.execute-api.us-east-2.amazonaws.com/production" // REPLACE WITH YOURS IF YOU WANT

const Page = () => {
  const [chatMode, setChatMode] = useState(false)
  const [messages, setMessages] = useState([])
  const [matched, setMatched] = useState(false)
  const [searching, setSearching] = useState(true);
  const [userDisconnected, setUserDisconnected] = useState(false)
  const [otherDisconnected, setOtherDisconnected] = useState(false)
  const [otherTyping, setOtherTyping] = useState(false);
  const [ws, setWs] = useState(null)

  useEffect(() => {
    if (!ws) return

    ws.onopen = (event) => {
      setChatMode(true)
      ws.send(JSON.stringify({ action: "match" }))
    }
    ws.onclose = () => setChatMode(false)
    ws.onerror = (err) => console.error

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data)
      if (eventData.system) {
        if (eventData.system === "unmatched") handleUnmatched(false, "other")
        else if (eventData.system === "matched") handleMatched()
        else if (eventData.system === "typing") setOtherTyping(eventData.typing)
        // else if (eventData.system === "failed to match") console.log(eventData.system)
      }
      else if (eventData.message) {
        setOtherTyping(false)
        setMessages(prev => [...prev, { own: false, msg: eventData.message }])
      }
    };

  }, [ws])

  function sendMessage(message) {
    message = message.trim()
    setMessages(prev => [...prev, { own: true, msg: message }])
    ws.send(JSON.stringify({ action: "message", message }))
  }

  function sendTypingStatus(typing) {
    ws.send(JSON.stringify({ action: "typing", typing }))
  }

  function handleMatched() {
    setMessages([])
    setOtherDisconnected(false)
    setUserDisconnected(false)
    setSearching(false)
    setMatched(true)
  }

  function handleUnmatched(matchNow, whoSkipped) {
    if (whoSkipped === "user") {
      ws.send(JSON.stringify({ action: "unmatch" }))
      setUserDisconnected(true)
      setOtherDisconnected(false)
    }
    else if (whoSkipped === "other") {
      setUserDisconnected(false)
      setOtherDisconnected(true)
    }
    else if (whoSkipped === "self") {
      ws.send(JSON.stringify({ action: "unmatch" }))
      setUserDisconnected(false)
      setOtherDisconnected(false)
    }
    setSearching(false)
    setMatched(false)
    if (matchNow) {
      setSearching(true)
      setMessages([])
      ws.send(JSON.stringify({ action: "match" }))
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ "background": "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)" }}>
      <Header />
      <div className='flex-grow flex items-center justify-center md:my-5 overflow-auto'>
        {chatMode
          ? <Chat
            sendMessage={sendMessage}
            messages={messages}
            matched={matched}
            searching={searching}
            setSearching={setSearching}
            userDisconnected={userDisconnected}
            otherDisconnected={otherDisconnected}
            handleUnmatched={handleUnmatched}
            sendTypingStatus={sendTypingStatus}
            otherTyping={otherTyping} />
          : <Menu startChat={() => setWs(new WebSocket(URL))} />}
      </div>
      {!chatMode && <Footer />}
    </div>
  )
}

export default Page