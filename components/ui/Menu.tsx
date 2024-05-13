"use client";

import { getSession } from "@/lib/actions/get-session";
import { JWTSession } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { title: "Главная", link: "/" },
  {
    title: "Дашборд",
    link: "/dashboard",
  },
];
export function Menu() {
  useEffect(() => {
    const updateSession = async () => {
      const updatedSession = await getSession();
      console.log(updatedSession);
      setSession(updatedSession);
    };
    updateSession();
  }, []);
  const pathname = usePathname();
  const [session, setSession] = useState<JWTSession | null>(null);
  return (
    <div className="grid grid-rows-1 grid-flow-col gap-[20px]">
      {menu.map((el) => (
        <Link
          href={el.link}
          key={el.title}
          className={clsx(pathname == el.link && "underline")}
        >
          {el.title}
        </Link>
      ))}
      {session ? (
        <Link href="/logout">Выйти ({session.credentials.login})</Link>
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </div>
  );
}
