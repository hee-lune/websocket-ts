'use client'

import { io, Socket } from "socket.io-client";
export default function Home(){
  const socket: Socket = io(
    { 
      path: '/api/events',
    }
  );
  const socketTest = () => {
    socket.emit('test')
    console.log("emit:test")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={socketTest}>test</button>
    </main>
  )
}