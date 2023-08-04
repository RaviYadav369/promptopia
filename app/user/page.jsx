"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import React, { useState,useEffect } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

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
