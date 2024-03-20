import Link from "next/link";


export default function Home() {
  return (
   <div className="flex flex-col justify-center items-center gap-3">
    <h1>Maps</h1>
    <Link href='/heatmap'>Go to Heatmap</Link>
    <Link href='/datamap'>Go to Datamap</Link>

   </div>
  );
}
