/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { Search, MoreVertical, Smile, Paperclip, Mic, Send } from "lucide-react"
import Button from "../../../../fields/Button"

const ChatMain = ({contacts, conversations, handleSendMessage, message}) => {
      const [activeChat, setActiveChat] = useState(0)
  return (
    <div>
    <div className="hidden md:flex flex-col w-2/3 bg-gray-50">
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={contacts.find((c) => c.id === activeChat)?.avatar || "/placeholder.svg?height=40&width=40"}
                  alt="Contact avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="font-semibold">{contacts.find((c) => c.id === activeChat)?.name}</h2>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical size={20} />
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 p-4 overflow-y-auto"
              style={{
                backgroundImage: "url('/placeholder.svg?height=500&width=500')",
                backgroundSize: "cover",
                opacity: 0.1,
              }}
            >
              <div className="space-y-4">
                {conversations[0].messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-lg ${
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
                //   onChange={(e) => setMessage(e.target.value)}
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
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center p-6 max-w-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Start chatting"
                className="w-48 h-48 mx-auto mb-6 opacity-50"
              />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Chats</h2>
              <p className="text-gray-500">
                Select a contact from the sidebar to start chatting or search for someone specific.
              </p>
            </div>
          </div>
        )}
      </div>      
    </div>
  )
}

export default ChatMain
