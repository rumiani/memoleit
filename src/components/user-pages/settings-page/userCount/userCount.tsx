import React, { useEffect, useState } from "react";

export default function UserCount() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("/api/userCount");
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUserCount();
  },[]);
  return (
    <div>
      {userCount && (
        <div
          title="Number of users using this app"
          className="w-full cursor-default text-start px-1 font-bold text-sm mx-auto"
        >
          Total users: {userCount}{" "}
        </div>
      )}
    </div>
  );
}
