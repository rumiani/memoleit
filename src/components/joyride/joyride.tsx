"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isTourOnReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const JoyrideComponent = () => {
  const { isTourOn } = useAppSelector((state) => state.settingState);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((setting) => {
        dispatch(isTourOnReducer(setting!.isTourOn));
      });
      setIsClient(true);
    }, [dispatch]);
    
    const steps = [
      {
        target: ".first-element",
        content: "Choose which categories to be in review list.",
      },
      {
        target: ".second-element",
        content: "Click to pronounce the word",
      },
      {
        target: ".third-element",
        content: "If you don't know the word, it will move to the box one and it will be reviewed tomorrow.",
      },
      {
        target: ".fourth-element",
        content: "If you know the word, it will move to the next box and it will be reviewed after a few days.",
      },
    ];
    const handleJoyrideCallback =async (data:any) =>{
      const { status, action } = data;
      // const finishedStatuses = ['finished', 'skipped'];
      // if (finishedStatuses.includes(status)) {
      //   // setRunTour(false);
      //   // setTourComplete();
      // }
      
      if (action === 'close' || status === 'skipped'|| status === 'skipped') {
        try {
          await db.setting.where("name").equals("setting").modify({ isTourOn: false })
        } catch (error) {
          console.log('Error');
          
        }
      }
      
    }
    
    return isClient && <Joyride steps={steps} run={isTourOn} callback={handleJoyrideCallback} />;
  };
  
  export default JoyrideComponent;
  