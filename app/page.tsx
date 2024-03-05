import Image from "next/image";
import neuvilette from "@/public/images/Neuvilette.png";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="relative h-screen">
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />

      <Image src={neuvilette} alt="Neuvilette Splash Art" className="mt-3" />
      <Image
        src="https://bit.ly/react-cover"
        alt="Coffee"
        width={300}
        height={170}
        className="mt-3 object-cover"
        quality={100}
        priority
      />
    </main>
  );
}
