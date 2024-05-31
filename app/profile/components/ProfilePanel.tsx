"use client";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { startTransition, use, useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Checkbox, Input, Typography } from "@mui/material";
import { FetchBalance, FetchUser } from "../action";
import { el } from "@faker-js/faker";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface BalanceInfo {
  balance: number;
  Silver: number;
  subscription: boolean;
  userId: string;
  Gold: number;
}

export function ProfilePanel() {
  const { user} = UserAuth();

  const [activeNode, setActiveNode] = useState(0);
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo | null>(null); // Initialize with null or with an initial value if desired

  const steps = ["UserProfile", "Email", "Transaction"];

  function GetCurrentBalance(userid: string) {
    startTransition(async () => {
      try {
        const result = await FetchBalance(userid);
        const data = JSON.parse(result);
        setBalanceInfo(data.balanceInfo);
      } catch (error) {
        console.error('Error during Fetching:', error);
      }
    })
  }
  useEffect(() => {
    if(user){
      GetCurrentBalance(user.uid);
    }
  },[user])

  const TestFetching = ()=> {
    startTransition(async ()=>{
      try{
        const result = await FetchUser();
      
      }
      catch(error){
        console.error('Error during Fetching:', error);

      }
    })
  }

  return (
    <div className="w-full space-y-12">

      {/* <p>Profile Setting</p> */}
      <div className="relative flex flex-col items-center justify-between w-full ">

        <div className="flex flex-row items-center space-x-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative z-10 px-4 py-2 font-bold text-black transition-all duration-300 rounded ${activeNode === index ? "bg-gray-900 text-white" : "bg-gray-300"}`}
              onClick={() => setActiveNode(index)}

            >
              {step}
            </div>
          ))}

        </div>
      </div>

      <motion.div
        className="mt-32 w-full" // Set width to full
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        key={activeNode}
      >

        {activeNode === 0 && (
          <div>
            <div className="grid gap-8 grid-cols-2 mb-8">
              <Typography> UserName : </Typography>

              <Input
                placeholder="UserName"
                value={user.displayName ?? ""}
                type="UserName"
              //onChange={field.onChange}
              />
              <Typography> PlayerName : </Typography>

              <Input
                placeholder="PlayerName"
                value={user.displayName ?? ""}
                type="playerName"
              //onChange={field.onChange}
              />
            </div>

            <div className="grid gap-8 grid-cols-2">
              <Typography> Curret Email : </Typography>
              <Input
                placeholder={"Monterya@Mail.com"}
                value={user.email ?? "Monterya@Mail.com"}
                type="email"
                disabled
              //onChange={field.onChange}
              />
              <Typography> Subscribtion</Typography> <Checkbox className="text-blue-500" {...label} disabled />

            </div>
          </div>





        )}
        {activeNode === 1 && (
          <div className="grid gap-8 grid-cols-2 items-center">
            <Typography className="text-gray-800">Email :</Typography>
            <Input
              placeholder="example@gmail.com"
              value={user.email ?? "Monterya@Mail.com"}
              type="email"
              disabled
              //onChange={field.onChange}
            />
            <Typography className="text-gray-800">Email Verifield :</Typography>

            <Checkbox className="text-blue-500" {...label} disabled />
          </div>

        )}

        {activeNode === 2 && (
          <div className="grid gap-8 grid-cols-2 items-center">
            <Typography className="text-gray-800">Balance :</Typography>
            <div className="flex justify-center">
              <Input
                className="text-center"
                placeholder="500 Baht"
                value={balanceInfo?.balance ?? 0}
                type="email"
                disabled
              //onChange={field.onChange}
              />
            </div>

            <Typography className="text-gray-800">Gold:</Typography>
            <div className="flex justify-center">
              <Input
                className="text-center"
                placeholder="10 Gold"
                value={balanceInfo?.Gold ?? 0}
                type="email"
                disabled
              //onChange={field.onChange}
              />
            </div>

            <Typography className="text-gray-800">Silver :</Typography>
            <div className="flex justify-center">
              <Input
                className="text-center"
                placeholder="500 Silver"
                value={balanceInfo?.Silver ?? 0}
                type="email"
                disabled
              //onChange={field.onChange}
              />
            </div>

          </div>
        )}


      </motion.div>

      <button
        className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={TestFetching}
      //disabled={isLastStep}
      >
        Edit
      </button>

    </div>
  )
}