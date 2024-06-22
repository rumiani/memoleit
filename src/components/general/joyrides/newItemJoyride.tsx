"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { tourReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const JoyrideNewItem = () => {
  const { tour } = useAppSelector((state) => state.settingState);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((setting) => {
        dispatch(tourReducer({ newItemTour: setting?.tour.newItemTour }));
      });
    setIsClient(true);
  }, [dispatch]);

  const steps = [
    {
      target: ".first-element",
      content: "Write your item you want to memorise",
    },
    {
      target: ".second-element",
      content: "Write a description for the item you want to memorise",
    },
    {
      target: ".third-element",
      content: "Pick up an existed category or type down a new one.",
    },
  ];
  const handleJoyrideCallback = async (data: any) => {
    const { status, action } = data;
    if (action === "close" || status === "skipped" || status === "skipped") {
      try {
        const setting = await db.setting
          .where("name")
          .equals("setting")
          .first();
        if (setting) {
          setting.tour.newItemTour = false;
          await db.setting.put(setting);
        }
      } catch (error) {
        console.log("Error");
      }
    }
  };

  return (
    isClient && (
      <Joyride
        steps={steps}
        run={tour.newItemTour}
        callback={handleJoyrideCallback}
      />
    )
  );
};

export default JoyrideNewItem;
