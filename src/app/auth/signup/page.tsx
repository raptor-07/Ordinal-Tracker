"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/types";
import type { TSignUpSchema } from "@/lib/types";
import {
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { addNewUser } from "@/actions/addNewUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (window.location.search.includes("user=invalid-credentials")) {
      form.setError("email", {
        type: "manual",
        message: "email or passoword is incorrect or does not exist",
      });
    }
    if (window.location.search.includes("user=account-exists")) {
      form.setError("email", {
        type: "manual",
        message: "account already exists with this email address",
      });
    }

    window.history.pushState({}, "", "/auth/signup");
    removeCookie("jwt-token");
  }, []);

  const onSubmit = async (data: TSignUpSchema) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });

      console.error("Passwords do not match");

      return;
    }

    const result = await addNewUser(data);

    if (result.success) {
      console.log("User added successfully");

      form.reset();

      router.push("/auth/signin");
    } else {
      console.error("Error occurred while adding user");
      form.setError("email", {
        type: "manual",
        message: "User already exists with this email address",
      });
    }
  };

  const onGoogleSubmit = async () => {
    form.reset();

    try {
      //link-dependency
      window.location.href =
        "https://ordinal-tracker-nest-be-7be2.onrender.com/auth/google-signin";

      // window.location.href = "http://localhost:3000/auth/google-signin";

      // window.location.href = "http://192.168.0.102:3000/auth/google-signin"
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container flex justify-center items-center h-[100vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-zinc-50 border-2 border-solid p-6 rounded-lg w-[20vw]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      {showPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      {showPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            Sign up
          </Button>

          <hr className="mt-4 opacity-50 rounded-3xl" />

          <Button
            type="button"
            className="w-full mt-4"
            onClick={onGoogleSubmit}
            disabled={form.formState.isSubmitting}
          >
            <IconBrandGoogleFilled />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
