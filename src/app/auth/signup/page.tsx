"use client";

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
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { addNewUser } from "@/actions/addNewUser";

const Page = () => {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
    }
  };

  const onGoogleSubmit = async () => {
    form.reset();

    // form.formState.isSubmitting = true;

    try {
      window.location.href = "http://192.168.0.121:3000/auth/google-signin";
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
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
                <FormLabel>confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
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
            Submit
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
