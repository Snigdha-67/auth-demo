"use client";

import { updateAvatar } from "@/server/updateAvatar";
import { LoaderIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { CardContent } from "../shadcnui/card";
import { toast } from "../shadcnui/toast";

type UpdateAvatarProps = {
  imgUrl: string | null | undefined;
};

const UpdateAvatar = ({ imgUrl }: UpdateAvatarProps) => {
  const [isloading, setIsloading] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const { push } = useRouter();

  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    validators: [
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /* 5 MB */ }),
    ],
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

  const updateAvatarHandler = async () => {
    setIsloading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const { isSuccess, messege } = await updateAvatar(imgUrl, plainFiles[0]);

    if (isSuccess) {
      toast.add({
        type: "success",
        title: messege,
      });

      push("/");
    } else {
      toast.add({
        type: "error",
        title: messege,
      });
    }

    setIsloading(false);
  };

  return (
    <CardContent className="grid place-items-center">
      {!isFile && (
        <button
          type="button"
          onClick={openFilePicker}>
          <Avatar className="size-64">
            {imgUrl && <AvatarImage src={`/${imgUrl}`} />}
            <AvatarFallback className="text-3xl">No Image</AvatarFallback>
          </Avatar>
        </button>
      )}

      {filesContent.map(({ content, name }) => (
        <button
          key={name}
          type="button"
          onClick={openFilePicker}>
          <Avatar className={"size-64"}>
            <AvatarImage src={content} />
          </Avatar>
        </button>
      ))}

      <Button
        type="button"
        onClick={updateAvatarHandler}
        className={"w-full"}
        disabled={isloading || !isFile}>
        {isloading ?
          <>
            <LoaderIcon className="animate-spin" /> Updating..
          </>
        : <>
            <UserPlus2Icon /> Update
          </>
        }
      </Button>
    </CardContent>
  );
};

export default UpdateAvatar;
