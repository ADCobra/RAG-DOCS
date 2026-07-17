"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import GoogleLogo from "./svg/googleLogo";
import { toast } from "sonner";
import {
  loginWithGoogleHandler,
  registerWithGoogleHandler,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const ContinueButton = ({
  successHandler,
}: {
  successHandler: (credentialResponse: CredentialResponse) => void;
}) => {
  const register = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      successHandler({ credential: tokenResponse.access_token });
    },
    onError: () => toast.error("Continue with Google Failed"),
  });

  return (
    <Button onClick={() => register()} className="w-full" variant={"outline"}>
      <GoogleLogo />
      <span className="ml-2">Continue with Google</span>
    </Button>
  );
};

function GoogleButton({ title }: { title: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const successHandler = async (credentialResponse: CredentialResponse) => {
    // The 'credential' is a JWT (ID Token)
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
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <ContinueButton successHandler={successHandler} />
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;
