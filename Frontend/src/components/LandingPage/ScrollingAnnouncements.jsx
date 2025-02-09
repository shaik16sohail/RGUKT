import React from 'react'
import { useEffect, useState } from "react";
export default function ScrollingAnnouncements(){
    const [announcements] = useState([
        "🚀 Exciting updates coming soon!",
        "📢 Stay tuned for our latest announcements!",
        "🎉 Check out our new features!",
      ]);
    return(
        <>
        <div style={{backgroundColor:"black"}} className="w-full  scroll-announce overflow-hidden   font-semibold p-2">
      <div className="flex space-x-10 animate-scroll">
        {announcements.map((announcement, index) => (
          <span key={index} className="whitespace-nowrap">
            {announcement}
          </span>
        ))}
      </div>
    </div>
        </>
    );
}