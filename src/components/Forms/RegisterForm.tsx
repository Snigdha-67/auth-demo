"use client";

import { authClient } from "@/lib/auth-client";
import { registerSchema, RegisterType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

const RegisterForm = () => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const registerFormHandler = async (rfData: RegisterType) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { error } = await authClient.signUp.email({
      name: rfData.name,
      email: rfData.email,
      password: rfData.password,
    });

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Registered Successfully",
      });

      reset();

      replace("/signin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerFormHandler)}
      className="grid place-items-center space-y-4"
      noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Your Name"
              autoComplete="on"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
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
              placeholder="Create a Password"
              autoComplete="on"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Confirm Your Password"
              autoComplete="on"
            />

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
            <PenIcon /> Register
          </>
        }
      </Button>
    </form>
  );
};

export default RegisterForm;
