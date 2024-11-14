'use client'

import { FormEvent } from "react"

export default function Login() {

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(formData)
        
        const response = await fetch("http://localhost:3000/api/login/", {
            method: "POST",
            body: formData,
        })
        
        const data = await response.json();
        console.log("Attempting Log In")
    }

    return (

        <div>
            <form onSubmit={onSubmit} className="flex flex-col">
                <input type="email" id="email" name="email" className="w-fit text-5 p-1 !outline-none focus:bg-slate-200" ></input> 
                <input type="password" id="password" name="password" className="w-fit text-5 p-1 !outline-none focus:bg-slate-200"></input>
                <button type="submit" className="w-fit bg-slate-500 text-white p-2 pr-3 font-bold">Login</button>       
            </form>
        </div>
    )

}