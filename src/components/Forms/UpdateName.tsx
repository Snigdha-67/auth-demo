"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const UpdateName = () => {
  const {} = useForm({
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
      name: "",
    },
    mode: "all",
  });

  return <></>;
};

export default UpdateName;
