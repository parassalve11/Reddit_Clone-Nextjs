import CreatePostCard from "@/components/CreatePostCard";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import RightHomePage from "@/components/RightHomePage";
import Skeletonn from "@/components/Skeleton";
import db from "@/lib/db";
import { Suspense } from "react";



export async function getData(searchParams:string){
 const [count , data] = await db.$transaction([
  db.post.count(),
  db.post.findMany({
    take:2,
    skip: searchParams ? (Number(searchParams) - 1) *2 : 0 , 
    select:{
      id:true,
      tittle:true,
      textContent:true,
      createdtAt:true,
      imageString:true,
      User:{
       select:{
        userName:true
       }
      },
      Vote:{
        select:{
          userId:true,
          postId:true,
          voteType:true
        }
      },
      subName:true,
    },

    orderBy:{
      createdtAt:'desc'
    }
  })
  
 ])
  return {data , count};
}

export default function Home({searchParams}:{searchParams:{page:string}}) {

  return (
    
  <div className="w-full m-auto flex  gap-x-10 mt-4 mb-10 px-10 lg:px-40">
   
    <div className="w-[64%] flex flex-col ">
    <CreatePostCard />
    <Suspense fallback={<Skeletonn/>}>
    <ShowItems searchParams={searchParams} />
    </Suspense>
     </div>
      <RightHomePage />

  </div>
  
  );
}


export  async function ShowItems({searchParams}:{searchParams:{page:string}}){
const {count , data} = await getData(searchParams.page)
  return(
   <>
    {data.map((post) => (
      <PostCard id={post.id} title={post.tittle} subName={post.subName as string} imageString={post.imageString} 
      userName={post.User?.userName as string} jsoncontent={post.textContent}
      key={post.id}
      voteCount={post.Vote.reduce((acc,vote) =>{
        if(vote.voteType === 'UP') return acc + 1;
        if(vote.voteType === 'DOWN') return acc -1 ;
        return acc;
      },0)}
      />
    ))}


    <Pagination totalPages={Math.ceil(count /2)} />
   </>
  )
}