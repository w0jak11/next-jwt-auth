"use client";

import { getSession } from "@/lib/actions/get-session";
import { logout } from "@/lib/actions/sign-out";
import { JWTSession } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { title: "Главная", link: "/" },
  {
    title: "Дашборд",
    link: "/dashboard",
  },
];
export function Menu() {
  const pathname = usePathname();
  useEffect(() => {
    const updateSession = async () => {
      const updatedSession = await getSession();
      console.log(updatedSession);
      setSession(updatedSession);
    };
    updateSession();
  }, [pathname]);

  const [session, setSession] = useState<JWTSession | null>(null);
  return (
    <div className='grid grid-rows-1 grid-flow-col gap-[20px]'>
      {menu.map((el) => (
        <Link href={el.link} key={el.title} className={clsx(pathname == el.link && "underline")}>
          {el.title}
        </Link>
      ))}
      {session ? (
        <form action={logout}>
          <button>Выйти ({session.credentials.login})</button>
        </form>
      ) : (
        <Link href='/login'>Войти</Link>
      )}
    </div>
  );
}
