"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
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
import { resetPasswordSchema } from "@/lib/types";
import type { TResetPasswordSchema } from "@/lib/types";
import { resetPassword } from "@/actions/resetPassword";

const Page = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await resetPassword(
      {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      },
      token!
    );

    if (result.success) {
      alert("Password reset successfully");
    } else {
      alert(`Error occurred in resetting your password. Please try again.
      ${result.error}
      `);
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
            name="newPassword"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm New Password" {...field} />
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
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
