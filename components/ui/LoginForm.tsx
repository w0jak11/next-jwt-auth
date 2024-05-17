"use client";

import { login } from "@/lib/actions/sign-in";
import { useFormState } from "react-dom";

export function LoginForm() {
  const [error, dispatch] = useFormState(login, "");
  return (
    <form className='grid gap-[15px] max-w-[400px]' action={dispatch}>
      <div className='grid'>
        <label htmlFor='login'>Логин</label>
        <input id='login' name='login' className='border-[2px] rounded-[10px] h-[50px] px-[10px]' />
      </div>
      <div className='grid'>
        <label htmlFor='password'>Пароль</label>
        <input
          id='password'
          name='password'
          type='password'
          className='border-[2px] rounded-[10px] h-[50px] px-[10px]'
        />
      </div>
      <button className='border-[2px] rounded-[10px] h-[50px]'>Войти</button>
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  );
}
