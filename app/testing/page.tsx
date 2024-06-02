"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Unity, useUnityContext } from "react-unity-webgl";
import {
  Button,
  button,
} from "@material-tailwind/react";
import { UserAuth } from "../context/AuthContext";
const unityContextLocation = "Unity-WebGl-Build/Build";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";


type ReactUnityEventParameter = string | number | undefined;


const page = () => {


  const [userName, setUserName] = useState();
  const {user} = UserAuth();

  if(user == null){
    redirect("/");
  }
 

  const { unityProvider, sendMessage, addEventListener, removeEventListener ,loadingProgression, isLoaded } =
    useUnityContext({
      // Replace with what the new path is if show Load Resource Error or GET Error
      loaderUrl: `${unityContextLocation}/monterya0.2.3.loader.js`,
      dataUrl: `${unityContextLocation}/monterya0.2.3.data`,
      frameworkUrl: `${unityContextLocation}/monterya0.2.3.framework.js`,
      codeUrl: `${unityContextLocation}/monterya0.2.3.wasm`,
    });
  
// 1EYikr0VG8SgxOLrpsk2rmzUmo83
// tO0iKyLOUkNHMUxHOfiyqozk9EC3

    function handleClickSpawnEnemies() {
      sendMessage("GameController", "SpawnEnemies", 100);
    }


    const UNITY_handleSetScore = useCallback((score) => {
      console.log("Trigger Game Over")
      toast.success('🦄 GameStarted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      console.log(user)
      console.log(user.uid)
    }, []);


     function setCurrentUserSession(){
        sendMessage("Client - Communicator", "SetUserId", user.uid);
        // You might need to handle some logic to set isLoaded to true
    }

    if (isLoaded === true) {
      //const jwt = localStorage.getItem('jwt');
      // <------------------ This works! ------------------------>
      sendMessage("Client - Communicator", "SetUserId", user.uid);
    }

    // Functions to allow Unity Game to send info to React
    useEffect(() => {

      addEventListener("SetScore", UNITY_handleSetScore);
      return () => {
        removeEventListener("SetScore", UNITY_handleSetScore);
      };
        
    
    }, [addEventListener, removeEventListener, UNITY_handleSetScore , user]);
  

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={"/rabbit_nobg.png"}
        alt="Rabbit Image"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Fragment>
              {!isLoaded && (
                <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
              )}
            <Unity
              unityProvider={unityProvider}
              style={{ visibility: isLoaded ? "visible" : "hidden", width: 1280, height: 720 }}
            />
            {/* <button className="bg-green-500"  onClick={handleClickSpawnEnemies}>Reload Game</button>
            <button className="bg-red-500" onClick={setCurrentUserSession}>TestGame</button> */}

            <button> </button>

          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default page;
