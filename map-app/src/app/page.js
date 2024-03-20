<<<<<<< HEAD
'use client'
import Map from "./components/Map";
=======
import Link from "next/link";

>>>>>>> b350a54

export default function Home() {
  return (
   <div className="flex flex-col justify-center items-center gap-3">
    <h1>Maps</h1>
    <Link href='/heatmap'>Go to Heatmap</Link>
    <Link href='/datamap'>Go to Datamap</Link>

   </div>
  );
}
