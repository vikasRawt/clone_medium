import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog{
    "content": string;
    "title": string;
    'id': number,
    "author":{
        "name":string
    }
}


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization: localStorage.getItem("Token")
        }
    }).then((res) => {
      setBlogs(res.data.post);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    blogs,
  };
};
