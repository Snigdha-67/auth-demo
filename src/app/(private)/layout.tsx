import Header from "@/components/Layout/Header";
import { auth } from "@/lib/auth";
import { LayoutProps } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PrivateLayout = async ({ children }: LayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signin");
  }

  return (
    <>
      <Header />

      <main className="grid h-dvh place-items-center">{children}</main>
    </>
  );
};

export default PrivateLayout;
