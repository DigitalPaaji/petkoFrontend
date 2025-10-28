"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl, imgurl } from '../components/apis'
import { FaEnvelope, FaUser, FaPhone, FaCalendar, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa'
import { LiaCheckDoubleSolid } from "react-icons/lia";

const MessagesPage = () => {
    const [allMessages, setAllMessages] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${baseurl}/message/allmessage`)
            const data = await response.data;
            if (data.success) {
                setAllMessages(data.messages)
                setFilteredMessages(data.messages)
            } else {
                setAllMessages([])
                setFilteredMessages([])
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
            setAllMessages([])
            setFilteredMessages([])
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = allMessages.filter(message =>
            message.name.toLowerCase().includes(term) ||
            message.email.toLowerCase().includes(term) ||
            message.message.toLowerCase().includes(term)
        )
        setFilteredMessages(filtered)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const deleteMessage = async (messageId) => {

// console.log(messageId)

        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await axios.delete(`${baseurl}/message/${messageId}`)
                if (response.data.success) {
                    fetchMessages() 
                }
            } catch (error) {
                console.error('Error deleting message:', error)
            }
        }
    }

    const openMessageModal = (message) => {
        setSelectedMessage(message)
        setIsModalOpen(true)
    }

const handelReed =async(id,bool)=>{

    if(bool){
        return
    }
    else{
        const response = await axios.put(`${baseurl}/message/seen/${id}`);
        const data = await response.data;
        if(data.success){
          fetchMessages()
        }

    }
}


    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Customer Messages</h1>
                <p className="text-gray-400">Manage and view all customer inquiries</p>
            </div>

            {/* Search and Stats */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages by name, email, or content..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-amber-400">
                        <FaFilter />
                        <span>{filteredMessages.filter((item)=>item.read==false).length}  messages found</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <FaEnvelope className="text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Messages</p>
                                <p className="text-white text-xl font-bold">{allMessages.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <FaUser className="text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Unique Contacts</p>
                                <p className="text-white text-xl font-bold">
                                    {new Set(allMessages.map(msg => msg.email)).size}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                                <FaPhone className="text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">With Phone Numbers</p>
                                <p className="text-white text-xl font-bold">
                                    {allMessages.filter(msg => msg.number).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500 rounded-lg">
                                <FaCalendar className="text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Today's Messages</p>
                                <p className="text-white text-xl font-bold">
                                    {allMessages.filter(msg => 
                                        new Date(msg.createdAt).toDateString() === new Date().toDateString()
                                    ).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages List */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                {filteredMessages.length === 0 ? (
                    <div className="text-center py-12">
                        <FaEnvelope className="text-gray-500 text-5xl mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No messages found</p>
                        <p className="text-gray-500 text-sm">
                            {searchTerm ? 'Try adjusting your search terms' : 'All messages will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        seen
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredMessages.map((message) => (
                                    <tr key={message._id} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <p className="text-white font-medium">{message.name}</p>
                                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                                    <FaEnvelope className="text-amber-400" />
                                                    {message.email}
                                                </p>
                                                {message.number && (
                                                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                                        <FaPhone className="text-green-400" />
                                                        {message.number}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-300 line-clamp-2 max-w-md">
                                                {message.message}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <FaCalendar className="text-amber-400" />
                                                <span className="text-sm">{formatDate(message.createdAt)}</span>
                                            </div>
                                        </td>


<td>
     <div className="flex items-center ps-10  text-gray-400" onClick={()=>handelReed(message._id,message.read)}>
                                                <LiaCheckDoubleSolid className={` ${!message.read? "text-gray-400" :"text-green-400"} `}/>
                                            </div>
    
</td>

                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => openMessageModal(message)}
                                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                                    title="View Message"
                                                >
                                                    <FaEye className="text-white text-sm" />
                                                </button>
                                                <button
                                                        onClick={() => deleteMessage(message._id)}
                                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                                    title="Delete Message"
                                                >
                                                    <FaTrash className="text-white text-sm" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Message Details</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Contact Info */}
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <FaUser className="text-amber-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Name</p>
                                                <p className="text-white">{selectedMessage.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaEnvelope className="text-amber-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Email</p>
                                                <p className="text-white">{selectedMessage.email}</p>
                                            </div>
                                        </div>
                                        {selectedMessage.number && (
                                            <div className="flex items-center gap-3">
                                                <FaPhone className="text-amber-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Phone</p>
                                                    <p className="text-white">{selectedMessage.number}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <FaCalendar className="text-amber-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Date</p>
                                                <p className="text-white">{formatDate(selectedMessage.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-3">Message</h4>
                                    <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>

                             
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
                                <button
                                    onClick={() => deleteMessage(selectedMessage._id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FaTrash />
                                    Delete Message
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessagesPage