"use client"

import { useState } from "react"
import { Search, MoreVertical, Smile, Paperclip, Mic, Send } from "lucide-react"
import Button from "../../../../fields/Button"
import ChatSidebar from "./ChatSidebar"
import ChatMain from "./ChatMain"

const Chats = () => {
  const [message, setMessage] = useState("")
  const [activeChat, setActiveChat] = useState(0)

  // Sample data for contacts and messages
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, how are you doing?",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we meet tomorrow?",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Team Project",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Alice: I finished the design",
      time: "Yesterday",
      unread: 5,
    },
    {
      id: 4,
      name: "Mom",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Call me when you get home",
      time: "Tuesday",
      unread: 0,
    },
    {
      id: 5,
      name: "Work Group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Meeting at 3pm tomorrow",
      time: "Monday",
      unread: 0,
    },
  ]

  const conversations = [
    {
      id: 1,
      messages: [
        { id: 1, sender: "them", text: "Hey, how are you doing?", time: "10:30 AM" },
        { id: 2, sender: "me", text: "I'm good! Just working on some projects. How about you?", time: "10:32 AM" },
        { id: 3, sender: "them", text: "Same here. Working on that app we discussed last week.", time: "10:33 AM" },
        { id: 4, sender: "me", text: "Oh nice! How's it going so far?", time: "10:35 AM" },
        {
          id: 5,
          sender: "them",
          text: "It's coming along well. I've finished the UI design and starting on the backend now.",
          time: "10:36 AM",
        },
        { id: 6, sender: "them", text: "Do you have time to catch up this weekend and discuss it?", time: "10:36 AM" },
        { id: 7, sender: "me", text: "I'm free on Saturday afternoon. Coffee at the usual place?", time: "10:40 AM" },
        { id: 8, sender: "them", text: "Perfect! See you then.", time: "10:41 AM" },
      ],
    },
    // Other conversations would be defined here
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    // In a real app, you would send the message to your backend here
    console.log("Sending message:", message)

    // Clear the input field
    setMessage("")
  }

  return (
    <div className="w-full h-[87vh] flex overflow-hidden bg-white rounded-lg shadow-lg">
        <ChatSidebar/>

      {/* Main chat area */}
  
  <ChatMain contact= {contacts} conversations={conversations} handleSendMessage={handleSendMessage} message={message}/>

      {/* Mobile view - when no chat is selected, show contacts. When chat is selected, show only chat */}
      <div className="md:hidden flex flex-col w-full">
        {activeChat ? (
          <>
            {/* Chat header with back button */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setActiveChat(0)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <img
                  src={contacts.find((c) => c.id === activeChat)?.avatar || "/placeholder.svg"}
                  alt="Contact avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="font-semibold">{contacts.find((c) => c.id === activeChat)?.name}</h2>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical size={20} />
              </Button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {conversations[0].messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === "me" ? "bg-green-100 rounded-tr-none" : "bg-white rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-right text-xs text-gray-500 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" type="button" className="text-gray-500">
                  <Smile size={24} />
                </Button>
                <Button variant="ghost" size="icon" type="button" className="text-gray-500">
                  <Paperclip size={24} />
                </Button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {message.trim() === "" ? (
                  <Button variant="ghost" size="icon" type="button" className="text-gray-500">
                    <Mic size={24} />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" type="submit" className="text-green-500">
                    <Send size={24} />
                  </Button>
                )}
              </form>
            </div>
          </>
        ) : (
          // Show contacts list on mobile when no chat is selected
          <>
            {/* Sidebar header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="w-10 h-10 rounded-full" />
                <h2 className="ml-3 font-semibold">Chats</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical size={20} />
                </Button>
              </div>
            </div>

            {/* Search bar */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Contact list */}
            <div className="overflow-y-auto flex-1">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                  onClick={() => setActiveChat(contact.id)}
                >
                  <img
                    src={contact.avatar || "/placeholder.svg"}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500 truncate w-40">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Chats
