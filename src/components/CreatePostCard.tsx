import Image from "next/image";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import { MoveRight } from "lucide-react";



export default function CreatePostCard() {
  return (
    <Card className="px-4 py-2 flex items-center w-full">
        <Image
        src={'/pfp2.png'}
        alt="pfp"
        width={50}
        height={200}
        className="object-contain  w-fit"
        />
      <Link href={'r/paras/create'} className="w-full flex items-center">
      <Input className="w-full  " placeholder="Create a Post" />
      <MoveRight className="m-3" />
      </Link>
     
    </Card>
  )
}
