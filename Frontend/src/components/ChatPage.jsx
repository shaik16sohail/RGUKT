import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SOCKET_SERVER_URL = 'http://localhost:8080';

const ChatPage = () => {
    const { user } = useAuth();
    const hostelName = user.hostelName;
    const senderName = user.name;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [imageFile,setImageFile]=useState(null);
    const socketRef = useRef();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        axios.get(`${SOCKET_SERVER_URL}/api/messages/${hostelName}`)
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));
    }, [hostelName]);

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);
        socketRef.current.emit('joinRoom', hostelName);

        socketRef.current.on('receiveMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [hostelName]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    const uploadImageToBackend =async(file)=>{
        const formData=new FormData();
        formData.append("image",file);

        const res=await axios.post(`${SOCKET_SERVER_URL}/api/upload`,formData,{
            headers:{"Content-Type":"multipart/form-data"}
        });
        return res.data.imageUrl;
    }
    const sendMessage = async() => {
        if (!newMessage.trim() && !imageFile) return;
        let imageUrl="";
        let isImage=false;

        if(imageFile){
            imageUrl=await uploadImageToBackend(imageFile);
            isImage=true;
        }
        socketRef.current.emit('sendMessage', {
            hostelName,
            senderName,
            message: newMessage,
            isImage,
            imageUrl

        });
        setNewMessage("");
        setImageFile(null);

    };

    return (
        <div style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#e5ddd5",
            boxSizing: "border-box",
            overflowX: "hidden"
        }}>
            <div
                style={{
                    height: "70vh",
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}
                className="chat-container"
            >
                {messages.map((msg, idx) => {
    const dateObj = new Date(msg.timestamp);
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., 18 Jul
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div
            key={idx}
            style={{
                alignSelf: msg.senderName === senderName ? "flex-end" : "flex-start",
                backgroundColor: msg.senderName === senderName ? "#dcf8c6" : "white",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "60%",
                wordWrap: "break-word",
                color: "black",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                position: "relative"
            }}
        >
            <div style={{
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "14px"
            }}>
                {msg.senderName}
            </div>

            {msg.isImage ? (
                <img
                    src={msg.imageUrl}
                    alt="uploaded"
                    style={{ width: "200px", borderRadius: "15px" }}
                />
            ) : (
                <div style={{ fontSize: "16px" }}>{msg.message}</div>
            )}

            {/* 👇 Date-Time Flex Row */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
                fontSize: "12px",
                color: "gray"
            }}>
                <span>{formattedDate}</span>
                <span>{formattedTime}</span>
            </div>
        </div>
    );
})}
{messages.map((msg, idx) => {
    const dateObj = new Date(msg.timestamp);
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., 18 Jul
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div
            key={idx}
            style={{
                alignSelf: msg.senderName === senderName ? "flex-end" : "flex-start",
                backgroundColor: msg.senderName === senderName ? "#dcf8c6" : "white",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "60%",
                wordWrap: "break-word",
                color: "black",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                position: "relative"
            }}
        >
            <div style={{
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "14px"
            }}>
                {msg.senderName}
            </div>

            {msg.isImage ? (
                <img
                    src={msg.imageUrl}
                    alt="uploaded"
                    style={{ width: "200px", borderRadius: "15px" }}
                />
            ) : (
                <div style={{ fontSize: "16px" }}>{msg.message}</div>
            )}

            {/* 👇 Date-Time Flex Row */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
                fontSize: "12px",
                color: "gray"
            }}>
                <span>{formattedDate}</span>
                <span>{formattedTime}</span>
            </div>
        </div>
    );
})}
                <div ref={messagesEndRef} />
            </div>

            <div style={{
                display: "flex",
                padding: "15px",
                backgroundColor: "#f0f0f0",
                gap: "10px"
            }}>
                <input
                    style={{
                        flex: 1,
                        padding: "10px 15px",
                        fontSize: "16px",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                        outline: "none",
                        color: "black",
                        backgroundColor: "white",
                        boxSizing: "border-box"
                    }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key ==='Enter') sendMessage();
                    }}
                    placeholder="Type your message..."
                />
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />

                <label htmlFor="image-upload" style={{
                    cursor: "pointer",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "25px",
                    border: "1px solid #ccc"
                }}>
                    📷
                </label>
                <button
                    onClick={sendMessage}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "25px",
                        backgroundColor: "#008069",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
