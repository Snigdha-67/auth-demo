import { LayoutProps } from "@/lib/types";

const PublicLayout = async ({ children }: LayoutProps) => {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  //   if (session) {
  //     return redirect("/");
  //   }

  return <main>{children}</main>;
};

export default PublicLayout;
