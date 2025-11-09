import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogById } from '../utils/blogsApi';
import { Calendar, Eye, User } from 'lucide-react';
import BlogComments from '../components/BlogComments';


interface Blog {
     _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  thumbnail?: string;
  author?: { name: string; email: string };
  views: number;
  createdAt: string;
}
function BlogDetails() {
    const {id} = useParams()
    const [blog, setBlog] = useState<Blog | null >(null)
    const [loading, setLoading] = useState(true)
     
    useEffect(()=> {
                  const  fetchBlog = async()=> {
                  try {
                     
                  
                      const data = await getBlogById(id as string)
                      setBlog(data)
          
                  } catch (error) {
                     console.error(error);
                  }finally{
                      setLoading(false)
                  }
                  }
                fetchBlog();
              },[id])

      if(loading ) return <p className='text-center text-gray-500 mt-10'>loading blog....</p>



  return (
    <div className='min-h-screen bg-linear-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 md:p-12 mt-14'>

        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden'>

            <img   className="w-full h-80 object-cover" src={`http://localhost:5000/images/${blog?.thumbnail}`}/>

      {/* 🧾 Content */}

      <div className='p-8'>
        <span className='text-sm font-medium text-cyan-600 uppercase tracking-wider'>{blog?.category}</span>

        <h1 className='text-4xl font-extrabold text-sky-800 mt-2 mb-3 leading-tight'>{blog?.title}</h1>
        <p className='text-lg text-sky-600 italic mb-6'>{blog?.subtitle}</p>

         <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8">
            <span className="flex items-center gap-1">
              <User size={16} className="text-cyan-500" />
              {blog?.author?.name || "Unknown"}
            </span>
           
           {blog?.createdAt && (
            <span className="flex items-center gap-1">
            <Calendar size={16} className="text-cyan-500" />
            {new Date(blog.createdAt).toLocaleDateString()}
        </span>
           )}
            <span className="flex items-center gap-1">
              <Eye size={16} className="text-cyan-500" />
              {blog?.views} views
            </span>
          </div>

          {/* 📝 Description */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog?.description}
          </div>
      </div>
        </div>

        <BlogComments  blogTitle={blog?.title || "General Blog" }  blogId={blog?._id!} />
    </div>
  )
}

export default BlogDetails