import { Search, MoreVertical } from "lucide-react"
import Button from "../../../../fields/Button"
import { useState } from "react"

const ChatSidebar = () => {
      const [activeChat, setActiveChat] = useState(0)
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
  return (
    <div>
       {/* Sidebar with contacts */}
       <div className="w-full md:w-1/3 border-r border-gray-200 bg-white">
        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center">
            {/* <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="w-10 h-10 rounded-full" /> */}
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
        <div className="overflow-y-auto h-[calc(87vh-132px)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChat === contact.id ? "bg-gray-100" : ""}`}
              onClick={() => setActiveChat(contact.id)}
            >
              {/* <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="w-12 h-12 rounded-full" /> */}
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
      </div>
    </div>
  )
}

export default ChatSidebar
