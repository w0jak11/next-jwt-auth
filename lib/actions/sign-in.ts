"use server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/jwt";
import { redirect } from "next/navigation";

export async function login(_: any, formData: FormData) {
  try {
    const credentials = {
      login: formData.get("login") as string,
    };
    const password = formData.get("password") as string;

    if (credentials.login !== "admin") {
      throw new Error("Wrong login or password");
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      "$2a$10$KC7F4uqpfeqBTdy3SfuDueib4R5J/uOVDa/Q/.iOF5zsez.VDWO9e"
    );
    if (!passwordCorrect) {
      throw new Error("Wrong login or password");
    }

    const session = await encrypt({ credentials });

    cookies().set("session", session, { httpOnly: true });
  } catch (err: any) {
    return err?.message;
  }
  redirect("/");
}
