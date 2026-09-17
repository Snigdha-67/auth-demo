import LoginForm from "@/components/Forms/LoginForm";
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
  title: "Login - AuthDemo",
  description: "Login Page of AuthDemo",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="">
          <CardTitle className="text-center text-2xl">LogIn</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <span> Don&apos;t have an account ?</span>
          <Link
            className="text-blue-500"
            href={"/register"}>
            Register
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
