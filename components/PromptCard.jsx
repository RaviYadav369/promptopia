'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import React,{useState} from "react";

const PromptCard = ({ post, handleTagClick,handleEdit,handleDelete }) => {
  const {data:session} = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copy, setcopy] = useState("");
  const handleCopy = ()=>{
    setcopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=> setcopy(''),3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={16}
            height={16}
            alt="copy_image"
          />
          <span className={copy === post.prompt ? 'inline text-sm p-1': 'hidden'}>copied</span>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator.id && 
      pathName === '/user' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter cursor-pointer green_gradient text-sm" onClick={handleEdit}>Edit</p>
          <p className="font-inter cursor-pointer orange_gradient text-sm" onClick={handleDelete}><Delete></Delete></p>
        </div>
      )
      }
    </div>
  );
};

export default PromptCard;
