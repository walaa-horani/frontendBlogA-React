import React from 'react'
import { Link } from 'react-router-dom';


interface BlogCardProps {
   id: string;
     title: string;
  subtitle?: string;
  category: string;
  thumbnail: string;
  author: string;
  date: string;
}

function BlogCard({id,title, subtitle, category, thumbnail, author, date}: BlogCardProps) {

  return (
    <div className='bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition'>
        
      <Link to={`/blog-details/${id}`}>

        
        <img  className="w-full h-48 object-cover" src={`https://backendblogainode.onrender.com/images/${
        thumbnail}`}/>

        <div className='p-5 space-y-2'>

      <span className='inline-block text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full'>{category}</span>

      <h3 className='text-lg font-bold text-gray-800 line-clamp-2'>{title}</h3>
       <p className='text-gray-500 text-sm line-clamp-2'>{subtitle}</p>  

      <div className='pt-3 border-t text-xs text-gray-400 flex justify-between'>
        
        <span>{author}</span>
        <span>{new Date(date).toLocaleDateString()}</span>
        </div>    

        </div>

</Link>

    </div>
  )
}

export default BlogCard