import { Trash } from 'lucide-react';
import React from 'react'
import { deleteBlog } from '../utils/blogsApi';
import toast from 'react-hot-toast';




interface Blog  {
  _id: string;
  title: string;
  subtitle?: string;       
  description: string;
  thumbnail?: string;      
  category: "Technology" | "Startup" | "Lifestyle" | "Finance";
  author: string;        
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}
interface BlogTableProps {
      blogs: Blog[];
}

function BlogTable({blogs}:BlogTableProps) {

const handleDelete = async(id: string) => {
    if(!confirm("Are you sure you want to delete this blog?")) return
    try {
        await deleteBlog(id)
         toast.success("Blog deleted successfully");

    } catch (error:any) {
          toast.error(error.message || "Failed to delete blog");
    }
}

  return (
    <div className='bg-white shadow-sm border mt-5 border-emerald-100 rounded-xl p-6'>
        
    <h3 className='text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2"'>Recent Blogs</h3> 



    <div className='overflow-x-auto'>
   
    <table className='min-w-full border-collapse'>
        <thead>
        <tr className='bg-emerald-50 text-emerald-700 text-left text-sm font-medium'>

        <th className="p-3 border-b">#</th>
           <th className="p-3 border-b">BLOG TITLE</th>
           <th className="p-3 border-b">AUTHOR</th>
           <th className="p-3 border-b">VIEWS</th>
          <th className="p-3 border-b">THUMBNAIL</th>
           <th className="p-3 border-b">DATE</th>
             <th className="p-3 border-b">ACTION</th>

         </tr>
        </thead>
        <tbody>
        {blogs.length === 0 ? (
            <tr>
                <td  colSpan={5} className="p-4 text-center text-gray-500">  No blogs found</td>
            </tr>
        ):(

            blogs?.map((blog,index)=> (
                <tr>

              <td className="p-3 border-b">    {index + 1}   </td>    
               <td className="p-3 border-b">    {blog?.title}   </td>          
                <td className="p-3 border-b">   {blog?.author?.name}   </td>
                 <td className="p-3 border-b">   {blog?.views}   </td>  
                 <td className="p-3 border-b"> 
                    <img src={`http://localhost:5000/images/${blog?.thumbnail}`}   className="w-12 h-12 object-cover rounded"/>
                    
                    </td>   

                <td className='p-3 border-b'> {new Date (blog?.createdAt).toLocaleDateString()}</td>  
              
                <td onClick={()=> handleDelete(blog._id)} className="p-3 border-b ">    <Trash className='text-red-600'/>   </td> 
                </tr>
            ))
        )}
            
        </tbody>
    </table>
        </div>   
     </div>
  )
}

export default BlogTable