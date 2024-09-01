import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      // e.preventDefault();

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  useEffect(()=>{
    if(email !== '' && room!== ''){
      socket.emit("room:join", { email, room });
    }

  },[email, room, socket])

  const handleJoinRoom = useCallback(
    async(data) => {
      const { email, room } = await data;
      console.log(email, room);
      if(room){

        navigate(`/room/${room}`);
      }
    },
    [navigate]
  );

  useState(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);


 



  const generateRandomName = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hannah"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const generateRandomRoomNumber = () => {
    return Math.floor(Math.random() * 1000) + 1; // Generates a number between 1 and 1000
  };

  const handleClick = async() => {
    const randomName = generateRandomName();
    const randomRoomNumber = generateRandomRoomNumber();
    setEmail(`${randomName}@example.com`);
    setRoom(`${randomRoomNumber}`);

    
  };
  const handlejoin = async()=>{
    const randomName = generateRandomName();

    setEmail(`${randomName}@example.com`);

  }



  return (
    <div className="  min-h-screen flex justify-center items-center max-w-[86rem] mx-auto">
      <div className=" flex-1">  
        <h1 className=" text-5xl">Video calls and meetings for everyone</h1> 
        <p className=" text-3xl  my-3  ">Connect anywhere with <span>weblab Meet</span></p>

           {/* <form className=" border-2   " onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email</label>
        <input className=""
          type="email"
          name="email"
          id=""
          style={{ display: "block" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input
          type="room"
          name="room"
          id=""
          style={{ display: "block" }}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">send request</button>
      </form> */}
      <div className=" h-fit space-x-4 ">
        <button onClick={handleClick} className="  bg-blue-700 text-white px-4 py-2 rounded-md text-lg">New meeting</button>
        <input type="text" 
       name="meeting-link" 
       id="meeting-link" 
       placeholder="Enter your meeting id" 
       onChange={(e) => setRoom(e.target.value)} 
       className=" px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 ease-in-out" />

        <button  onClick={handlejoin} disabled ={room.length !== 0 ? false : true} className=" disabled:text-gray-400  font-semibold px-4 py-2 rounded-md text-lg">Join</button>
    
      </div>
      </div>
<div className=" flex-1">
  <img src="https://www.searchenginejournal.com/wp-content/uploads/2019/11/8-superstar-video-conferencing-chat-apps-for-business-5de073204c94e.png" alt="" />
</div>
    </div>
  );
};

export default LobbyScreen;
