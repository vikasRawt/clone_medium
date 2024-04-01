interface BlogCardComp {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardComp) => {
  return (
    <div className="border border-slate-200 pb-4">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <div className="flex items-center">
            <Avatar name={authorName} />
            <div className="font-extralight pl-2">{authorName}</div>
            <div className="pl-2 font-thin text-sm text-slate-400">{publishedDate}</div>
          </div>
          <div className="font-bold">{title}</div>
          <div className="font-light">{content.slice(0, 100) + "..."}</div>
          <div className="text-slate-400 text-sm pt-3">
            {`${Math.ceil(content.length / 100)} min read`}
          </div>
        </div>
      </div>
    </div>
  );
};

export function Avatar({ name, size ="small"}: { name: string, size?:"small"|"big" }) {
  return (
    <div className={`flex items-center justify-center ${size=="small"?"w-6 h-6":"w-10 h-10"}  overflow-hidden bg-gray-500 rounded-full`}>
      <span className={`${size==="small"?"text-xs":"text-md"}font-extralight`}>{name[0]}</span>
    </div>
  );
}
