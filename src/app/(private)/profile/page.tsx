import UpdateAvatar from "@/components/Forms/UpdateAvatar";
import UpdateName from "@/components/Forms/UpdateName";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile - Auth-Demo",
  description: "Profile of Auth-Demo",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signin");
  }

  const { image, name } = session.user;

  return (
    <section className="space-y-6">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Update Your Avatar
          </CardTitle>
        </CardHeader>

        <UpdateAvatar imgUrl={image} />
      </Card>

      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Update Your Name
          </CardTitle>
        </CardHeader>

        <UpdateName prevName={name} />
      </Card>
    </section>
  );
};

export default page;
