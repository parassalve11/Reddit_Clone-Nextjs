'use client'
import SubmitButton from "@/components/SubmitButton";
import Tiptap from "@/components/TiptapEditor";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadDropzone } from "@/components/uploadthing"; 
import { CreatePost } from "@/lib/actions/createPost";
import { Text, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { JSONContent } from "@tiptap/react";

const rules = [
  {
    id: 1,
    text: "Remember you are the Human.",
  },
  {
    id: 2,
    text: "behave like a Human .",
  },
  {
    id: 3,
    text: "Look at the Orignal source of Content.",
  },
  {
    id: 4,
    text: "Search for the dublication before Posting.",
  },
  {
    id: 5,
    text: "Read the Community Guidelines.",
  },
];

export default function CratePostPage({ params }: { params: { id: string } }) {
  const[imageUrl , setImageUrl] = useState<null | string>(null)
  const[json , setJson] = useState<null | JSONContent>(null);
  const[title , setTitle] = useState<null | string>(null);

  const CreatePostReddit = CreatePost.bind(null , {jsonContent: json})
  return (
    <div className="w-full px-20 lg:px-40 flex gap-x-10 m-auto ">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit : {""}
          <Link className="text-primary" href={`/r/${params.id}`}>
            r/ {params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid grid-cols-2 w-full ">
            <TabsTrigger value="post">
              <Text className="w-4 h-4 m-1" /> Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <VideoIcon className="w-4 h-4 m-1" /> Image and Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card className="flex flex-col p-4">
              <form action={CreatePostReddit}>
                <Input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />
                <Input type="hidden" name="subName" value={params.id} />

                <CardHeader>
                  <Label>Tittle</Label>
                  <Input
                    required
                    name="tittle"
                    placeholder="Tittle"
                    value={title ?? undefined}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Tiptap setJson={setJson} json={json} />
                </CardHeader>

                <CardFooter>
                  <SubmitButton name="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? 
                (
                  <UploadDropzone
                  className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert("Error");
                  }}
                />
                ):(
                  <Image
                  src={imageUrl}
                  alt="image"
                  height={400}
                  width={500}
                  className= "h-80 object-contain rounded-md  w-full"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="w-[35%]  ">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-4">
            <Image src={"/pfp.png"} alt="pfp" width={60} height={60} />
            <h1 className="font-semibold ">Rules to Make a Post of Reddit</h1>
          </div>

          <Separator className="mt-2 text-xl" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm text-slate-700">
                  {item.id} . {item.text}
                </p>
                <Separator />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
