"use client";

import Loader from "@/components/loader";
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
  registerHandler,
} from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error, success, message } = useSelector(
    (state: RootState) => state.user
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(registerHandler({ name, email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success(message || "Registered successfully");
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle>Register your account</CardTitle>
              <CardDescription>
                Enter your email below to register your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitHandler}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                    <FieldDescription>
                      Please confirm your password.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit">Register</Button>
                    <Button variant="outline" type="button">
                      Register with Google
                    </Button>
                    <FieldDescription className="text-center">
                      Already have an account? <Link href="/login">Login</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
