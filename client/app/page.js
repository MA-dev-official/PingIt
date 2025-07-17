"use client"; 
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

const router = useRouter()
  const { register, handleSubmit,
         formState: { errors }
        } = useForm();
  const onSubmit = (data) =>{
    router.push(`/chat?username=${encodeURIComponent(data.username)}`)
  }
  
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2">
          <div className="flex flex-col items-center  w-[90%] h-[400px] px-5 text-center border border-gray-800 p-2">
            <div className="size-12 rounded-full  mt-4 bg-white pt-2">
              <img src="/user.svg" alt="pingit logo" className="w-full h-full rounded-full" />
            </div>            
              <h1 className="text-xl font-bold">Welcome to PingIt</h1>
            <h2 className="text-sm w-[80%] text-gray-600 mt-4 ">Choose a username to start chatting <br/> with random people </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full mt-10">
              <label htmlFor="username" className="text-sm font-semibold mb-2 w-full text-start">Username</label>
                <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                {...register("username", { required: true })}
              />
              { errors.username &&
                <p className="text-red-500 text-sm mt-2">Username is required</p>
              }              
              <button
                type="submit"
                className="w-full p-2 mt-4 text-white bg-violet-600 rounded-md"
              >
                Start Chatting
              </button>
              </form>
            <div className=" flex  items-center justify-around p-4 text-blue-500 underline w-full ">
            <Link href="/terms">
            Terms of Services
            </Link>
              <Link href="/privacy">
              Privacy Policy
            </Link>
            </div>
              
              </div>
          
          </div>
            
      </main>
    </>
  );
}
