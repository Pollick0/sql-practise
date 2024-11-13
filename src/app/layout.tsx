import Link from "next/link";


async function Navbar() {
  return (
    <nav>
      <ul className="list-none">
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/"}>Labeller</Link></li>
        <li><Link href={"/"}>Catalogue</Link></li>
        <li><Link href={"/auth/signup"}>Sign Up</Link></li>
        <li><Link href={"/auth/login"}>Login</Link></li>
      </ul>
    </nav>  
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
