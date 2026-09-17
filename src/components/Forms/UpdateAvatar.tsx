"use client";

import { useState } from "react";
import { useFilePicker } from "use-file-picker";

const UpdateAvatar = () => {
  const [isloading, setIsloading] = useState(false);

  const {} = useFilePicker();

  const deleteHandler = async () => {
    setIsloading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setIsloading(false);
  };

  return <button></button>;
};

export default UpdateAvatar;
