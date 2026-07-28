"use client";

import GoogleButton from "@/components/googleButton";
import Loader from "@/components/loader";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  clearError,
  clearSuccess,
  loginHandler,
} from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { User } from "lucide-react";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error, success, message } = useSelector(
    (state: RootState) => state.user,
  );

  function handleGuestLogin() {
    dispatch(
      loginHandler({ email: "guest@mail.com", password: "guestpassword" }),
    );
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch(loginHandler({ email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success(message || "Logged in successfully");
      dispatch(clearSuccess());
      router.push("/chat");
      return;
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
      return;
    }
  }, [dispatch, error, success, message, router]);

  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user, router]);

  if (user) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-svh w-full items-center justify-center p-3 xs:p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={"flex flex-col gap-6"}>
            <Card>
              <CardHeader className="md:px-6 px-4">
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="md:px-6 px-4">
                <Button
                  onClick={handleGuestLogin}
                  variant="outline"
                  className="w-full rounded-md mb-4"
                >
                  <User className="mr-2 h-4 w-4" />
                  Continue as Guest
                </Button>
                <form onSubmit={submitHandler}>
                  <FieldGroup className="gap-3">
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        {/* future update
                       <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <Button type="submit">Login</Button>
                      <GoogleButton title="Login with Google" />
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/register">Sign up</Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
