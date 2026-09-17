"use client";

import { authClient } from "@/lib/auth-client";
import { loginSchema, LoginType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

const LoginForm = () => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "all",
  });
  const loginFormHandler = async (lfData: LoginType) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { error } = await authClient.signIn.email(lfData);

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Logged in Successfully",
      });

      reset();

      replace("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(loginFormHandler)}
      className="grid place-items-center space-y-4"
      noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email Address</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="xyz@eamil.com"
              autoComplete="on"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Password"
              autoComplete="on"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rememberMe"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            orientation={"horizontal"}
            data-invalid={fieldState.invalid}>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel>Remember Me</FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        className={"mt-4 w-full"}

        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <LoaderIcon className="animate-spin" /> Waiting ...
          </>
        : <>
            <LogInIcon /> LogIn
          </>
        }
      </Button>
    </form>
  );
};

export default LoginForm;
