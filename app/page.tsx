"use client";

import { decrement, fetchUsers, increment } from "@/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const userRef = useRef(false);
  const { entities, loading, value  } = useSelector(
    (state: RootState) => state.user
  );
  const disptach = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userRef.current === false) {
      disptach(fetchUsers());
    }

    return () => {
      userRef.current = true;
    };
  }, []);


  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        entities?.map((user: any) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.phone}</p>
            <p>{user.company.catchPhrase}</p>
            <br />
          </div>
        ))
      )}
      <h1>{value}</h1>
      <button onClick={() => disptach(increment())}>UP</button>
      <button onClick={() => disptach(decrement())}>DOWN</button>
    </div>
  );
}