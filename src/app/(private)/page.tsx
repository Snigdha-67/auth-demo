import LogOutButton from "@/components/LogOutButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { buttonVariants } from "@/components/shadcnui/button";
import { auth } from "@/lib/auth";
import { PenLineIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Auth-Demo",
  description: "Dashboard of Auth-Demo",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signin");
  }

  const { name, email, image } = session.user;

  const nameParts = name.trim().split(/\s+/);

  // const firstName = nameParts[0].charAt(0).toUpperCase();

  // const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : "";

  const nameFallback = `${nameParts[0].charAt(0).toUpperCase()} ${nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : ""}`;

  return (
    <main className="grid h-dvh place-items-center">
      <section className="grid place-items-center gap-8">
        <Avatar className="size-64">
          {image && <AvatarImage src={`/${image}`} />}
          <AvatarFallback className="text-3xl">{nameFallback}</AvatarFallback>
        </Avatar>

        <h1 className="text-6xl font-semibold capitalize">Welcome, {name}</h1>

        <p className="text-xl">{email}</p>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href={"/profile"}
            className={buttonVariants({ size: "lg" })}>
            <PenLineIcon /> Update Profile
          </Link>

          <LogOutButton />
        </div>
      </section>
    </main>
  );
};

export default page;
