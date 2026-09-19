"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";

export const updateAvatar = async (
  prevImageUrl: string | null | undefined,
  avatarImg: File,
) => {
  try {
    if (prevImageUrl !== null) {
      await rm(`./public/${prevImageUrl}`);
    }

    const imageName = `${crypto.randomUUID()}.jpeg`;

    await sharp(await avatarImg.arrayBuffer())
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);

    const imageUrl = `uploads/${imageName}`;

    await auth.api.updateUser({
      headers: await headers(),
      body: {
        image: imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/profile");

    return {
      isSuccess: true,
      messege: "Avatar Updated Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "Avatar Updatation Failed 🚨",
    };
  }
};
