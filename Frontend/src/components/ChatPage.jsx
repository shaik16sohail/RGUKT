import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Send, Image, MessageCircle } from 'lucide-react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const SOCKET_SERVER_URL = backendUrl;

const ChatPage = () => {
    const { user } = useAuth();
    const hostelName = user.hostelName;
    const senderName = user.name;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
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

    const uploadImageToBackend = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(`${SOCKET_SERVER_URL}/api/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data.imageUrl;
    }

    const sendMessage = async () => {
        if (!newMessage.trim() && !imageFile) return;
        let imageUrl = "";
        let isImage = false;

        if (imageFile) {
            imageUrl = await uploadImageToBackend(imageFile);
            isImage = true;
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
        <div className="chat-page">
            <style jsx>{`
                .chat-page {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%);
                    background-attachment: fixed;
                    position: relative;
                    overflow: hidden;
                }

                .chat-page::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
                    pointer-events: none;
                }

                .chat-header {
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: white;
                    position: relative;
                    z-index: 2;
                }

                .chat-header-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
                }

                .chat-header-text {
                    flex: 1;
                }

                .chat-header h1 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #ffffff, #f0f0f0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .chat-header p {
                    margin: 5px 0 0 0;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 14px;
                }

                .messages-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    position: relative;
                    z-index: 1;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
                }

                .messages-container::-webkit-scrollbar {
                    width: 6px;
                }

                .messages-container::-webkit-scrollbar-track {
                    background: transparent;
                }

                .messages-container::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 3px;
                }

                .messages-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }

                .message-bubble {
                    max-width: 70%;
                    padding: 16px 20px;
                    border-radius: 24px;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    animation: messageSlideIn 0.3s ease-out;
                    transition: all 0.3s ease;
                }

                .message-bubble:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }

                .message-bubble.sent {
                    align-self: flex-end;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
                    color: white;
                    border-radius: 24px 24px 8px 24px;
                }

                .message-bubble.received {
                    align-self: flex-start;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
                    color: white;
                    border-radius: 24px 24px 24px 8px;
                }

                .message-sender {
                    font-weight: 600;
                    font-size: 13px;
                    margin-bottom: 8px;
                    opacity: 0.9;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .message-content {
                    font-size: 16px;
                    line-height: 1.4;
                    word-wrap: break-word;
                    margin-bottom: 8px;
                }

                .message-image {
                    width: 100%;
                    max-width: 250px;
                    border-radius: 16px;
                    margin-bottom: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease;
                }

                .message-image:hover {
                    transform: scale(1.02);
                }

                .message-timestamp {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    opacity: 0.7;
                    margin-top: 4px;
                }

                .input-container {
                    padding: 25px;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .message-input {
                    flex: 1;
                    padding: 16px 24px;
                    font-size: 16px;
                    border-radius: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    color: white;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .message-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }

                .message-input:focus {
                    border-color: rgba(255, 255, 255, 0.4);
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .input-button {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    position: relative;
                    overflow: hidden;
                }

                .input-button::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
                    transition: all 0.3s ease;
                }

                .input-button:hover::before {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
                }

                .input-button:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                }

                .input-button svg {
                    width: 20px;
                    height: 20px;
                    color: white;
                    position: relative;
                    z-index: 1;
                }

                .image-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .send-button {
                    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
                }

                .send-button:hover {
                    background: linear-gradient(135deg, #ff5252 0%, #ff7043 100%);
                }

                .image-preview {
                    position: absolute;
                    bottom: 100px;
                    right: 25px;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    padding: 10px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .image-preview img {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                @keyframes messageSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @media (max-width: 768px) {
                    .chat-header {
                        padding: 15px;
                    }
                    
                    .chat-header h1 {
                        font-size: 20px;
                    }
                    
                    .messages-container {
                        padding: 20px 15px;
                        gap: 15px;
                    }
                    
                    .message-bubble {
                        max-width: 85%;
                        padding: 12px 16px;
                    }
                    
                    .input-container {
                        padding: 15px;
                        gap: 10px;
                    }
                    
                    .message-input {
                        padding: 12px 18px;
                        font-size: 14px;
                    }
                    
                    .input-button {
                        width: 45px;
                        height: 45px;
                    }
                }

                @media (max-width: 480px) {
                    .message-bubble {
                        max-width: 90%;
                    }
                }
            `}</style>

            {/* Chat Header */}
            {/* <div className="chat-header">
                <div className="chat-header-icon">
                    <MessageCircle size={20} />
                </div>
                <div className="chat-header-text">
                    <h1>{hostelName}</h1>
                    <p>Welcome, {senderName}</p>
                </div>
            </div> */}

            {/* Messages Container */}
            <div className="messages-container">
                {messages.map((msg, idx) => {
                    const dateObj = new Date(msg.timestamp);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <div
                            key={idx}
                            className={`message-bubble ${msg.senderName === senderName ? 'sent' : 'received'}`}
                        >
                            <div className="message-sender">
                                {msg.senderName}
                            </div>

                            {msg.isImage ? (
                                <img
                                    src={msg.imageUrl}
                                    alt="uploaded"
                                    className="message-image"
                                />
                            ) : (
                                <div className="message-content">{msg.message}</div>
                            )}

                            <div className="message-timestamp">
                                <span>{formattedDate}</span>
                                <span>{formattedTime}</span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Image Preview */}
            {imageFile && (
                <div className="image-preview">
                    <img src={URL.createObjectURL(imageFile)} alt="preview" />
                </div>
            )}

            {/* Input Container */}
            <div className="input-container">
                <input
                    className="message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
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

                <label htmlFor="image-upload" className="input-button image-button">
                    <Image />
                </label>

                <button onClick={sendMessage} className="input-button send-button">
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default ChatPage;