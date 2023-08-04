'use client'

import { useEffect } from 'react';
import { io, Socket } from "socket.io-client";
export default function Home(){
  const socket: Socket = io(
    { 
      path: '/api/events',
    }
  );
  const socketTest = () => {
    console.log("test")
    socket.emit('test')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>websocket</h1>
      <button onClick={socketTest}>test</button>
    </main>
  )
}