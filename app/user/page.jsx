"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [posts, setposts] = useState([]);
  const handleEdit = (post) => {
    console.log(post);
    router.push(`/update-prompt?id=${post._id}`)
    router.push(`/update-prompt?id=${post._id}`);

  };
  const handleDelete = async (post) => {
    console.log(post);
    try {
      await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
      const filterPost = posts.filter((p)=> p._id === post._id)
      setposts(filterPost)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your Profile Page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
