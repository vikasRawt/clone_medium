import { Avatar } from "./BlogCard";

export const Navbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center">Medium</div>
      <div>
        <Avatar name="Vikas" size="big" />
      </div>
    </div>
  );
};
