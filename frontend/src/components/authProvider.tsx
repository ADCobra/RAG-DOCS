"use client";

import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./loader";
import { useRouter } from "next/navigation";

function AuthProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    <Loader />;
  }

  return <>{user && !loading ? children : <Loader />}</>;
}

export default AuthProvider;
