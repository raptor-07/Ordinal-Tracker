"use client";

import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetTokenFormSchema } from "@/lib/types";
import type { TSendResetTokenFormSchema } from "@/lib/types";
import { sendResetToken } from "@/actions/sendResetToken";

async function handleReset(email: string) {
  console.log({ email });
  const result = await sendResetToken({ email });

  console.log("result", result);
  if (result.success) {
    alert("Reset link sent to your email");
  } else {
    alert(
      "Error occurred in resetting your email. Please make sure the email is correct and your account exists."
    );
  }
}

const Page = () => {
  const form = useForm<TSendResetTokenFormSchema>({
    resolver: zodResolver(sendResetTokenFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TSendResetTokenFormSchema) => {
    console.log(data);
    await handleReset(data.email);
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

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
