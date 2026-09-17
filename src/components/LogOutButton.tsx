"use client";

import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./shadcnui/button";
import { Spinner } from "./shadcnui/spinner";
import { toast } from "./shadcnui/toast";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);

  const { replace } = useRouter();

  const logoutbtn = async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));
    const { data } = await authClient.signOut();

    if (data?.success) {
      toast.add({
        type: "success",
        title: "LogOut successfully",
      });

      replace("/signin");
    }

    setLoading(false);
  };

  return (
    <Button
      type="button"
      size={"lg"}
      variant={"destructive"}
      disabled={loading}
      onClick={logoutbtn}>
      {loading ?
        <>
          <Spinner /> Logging Out
        </>
      : <>
          <LogOutIcon /> Log Out
        </>
      }
    </Button>
  );
};

export default LogOutButton;
