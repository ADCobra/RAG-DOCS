"use client";

import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { toast } from "sonner";
import {
  loginWithGoogleHandler,
  registerWithGoogleHandler,
} from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

function GoogleButton({ title }: { title: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const successHandler = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google login failed: No credential received");
      return;
    }

    if (title.toLowerCase().includes("register")) {
      dispatch(registerWithGoogleHandler({ token: idToken }));
      return;
    }
    dispatch(loginWithGoogleHandler({ token: idToken }));
  };

  return (
    <div className="w-full">
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        {/* <ContinueButton successHandler={successHandler} /> */}
        <GoogleLogin
          onSuccess={successHandler}
          onError={() => toast.error("Google Login Failed")}
          useOneTap
          text="continue_with"
          logo_alignment="center"
          width={"100%"}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleButton;
