import {  useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";

interface Blog {
  id: number;
  title: string;
  content: string;
  author?: {
    name: string;
  };
}

export function Blog() {
  const { blogs } = useBlogs();
  const [searchQuery, setSearchQuery] = useState<string>(''); 

 
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="mt-16">
        <input
          placeholder="type blog"
          className="border-black"
          value={searchQuery}
          onChange={handleInputChange} 
        />
        <button className="bg-black text-cyan-50 rounded">click me!</button> 
      </div>
      <div className="flex justify-center">
        <div className="max-w-xl">
          {filteredBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              authorName={blog.author ? blog.author.name || "Anonymous" : "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="Mar 24th 2024"
            />
          ))}
        </div>
      </div>
    </>
  );
}
