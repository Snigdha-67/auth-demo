"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../shadcnui/button";
import { CardContent } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

type UpdateNameProps = {
  prevName: string;
};

const UpdateName = ({ prevName }: UpdateNameProps) => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,

    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(2, { error: "Name must be at least 2 characters" })
          .max(32, { error: "Name must be at most 32 characters" }),
      }),
    ),
    defaultValues: {
      name: prevName,
    },
    mode: "all",
  });

  const updateNameHandler = async ({ name }: { name: string }) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { error } = await authClient.updateUser({
      name,
    });

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Name update Successfull",
      });

      push("/");
    }
  };

  return (
    <CardContent>
      <form
        onSubmit={handleSubmit(updateNameHandler)}
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
                autoComplete="name"
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
              <PenIcon /> Update
            </>
          }
        </Button>
      </form>
    </CardContent>
  );
};

export default UpdateName;
