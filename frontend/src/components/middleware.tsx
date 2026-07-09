"use client";

import { loadUserHandler } from "@/store/slices/userSlice";
import store from "@/store/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

const Middleware = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    store.dispatch(loadUserHandler());
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Middleware;
