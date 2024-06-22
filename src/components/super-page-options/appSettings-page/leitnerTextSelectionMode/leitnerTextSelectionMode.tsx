import React, { useEffect } from "react";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import { leitnerTextSelectionModeReducer } from "@/src/redux/slices/settingStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";
export default function LeitnerTextSelectionMode() {
  const { leitnerTextSelectionMode } = useAppSelector(
    (state) => state.settingState,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((setting) => {
        dispatch(
          leitnerTextSelectionModeReducer(setting?.leitnerTextSelectionMode!),
        );
      });
  }, [leitnerTextSelectionMode, dispatch]);
  const handleInputChange = async () => {
    await db.setting
      .where("name")
      .equals("setting")
      .modify({ leitnerTextSelectionMode: !leitnerTextSelectionMode })
      .then(() => {
        dispatch(leitnerTextSelectionModeReducer(!leitnerTextSelectionMode));
        if (leitnerTextSelectionMode) {
          toast.success("Leitner text selection mode turned off");
        } else {
          toast.success("Leitner text selection mode turned on");
        }
      });
  };

  return (
    <div className="w-full flex flex-col gap-x-4 justify-between">
      <strong>Study</strong>
      <CheckboxInput
        value="Leitner Text Selection"
        status={leitnerTextSelectionMode}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
