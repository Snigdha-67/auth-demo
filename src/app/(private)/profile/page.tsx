import UpdateAvatar from "@/components/Forms/UpdateAvatar";
import UpdateName from "@/components/Forms/UpdateName";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";

const page = () => {
  return (
    <section className="space-y-6">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Update Your Avatar
          </CardTitle>
        </CardHeader>

        <UpdateAvatar />
      </Card>

      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Update Your Name
          </CardTitle>
        </CardHeader>

        <UpdateName />
      </Card>
    </section>
  );
};

export default page;
