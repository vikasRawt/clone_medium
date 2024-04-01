import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading....</div>;
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map(blog => <BlogCard
              authorName={ blog.author?blog.author.name || "Anonymous":"Anonymous"} 
              title={blog.title}
              content={blog.content}
              publishedDate="Mar 24th 2024"
            />
          )}
        </div>
      </div>
    </>
  );
}
