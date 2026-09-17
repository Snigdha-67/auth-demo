import RegisterForm from "@/components/Forms/RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register - AuthDemo",
  description: "Register Page of AuthDemo",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="">
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <span> Already have an account ?</span>
          <Link
            className="text-blue-500"
            href={"/signin"}>
            LogIn
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
