import { MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMyBlogComments } from '../utils/commentApi';


interface Comment {
  _id: string;
  name: string;
  comment: string;
  blog: {
    _id: string;
    title: string;
  };
  createdAt: string;
}
function DashboardComments() {

    const [comments, setComments] = useState<Comment[]>([])
        const [loading, setLoading] = useState(true)
        useEffect(()=> {

           const fetchComments = async()=> {
            try {
                const data = await getMyBlogComments()
                setComments(data)
            } catch (error) {
                  console.error(error);
            }finally{
                setLoading(false)
            }
           }
        fetchComments();
        },[])

  return (
    <div className='bg-white shadow-sm border border-emerald-100 rounded-xl p-6 mt-8'>
         <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-emerald-600" />
        Recent Comments on Your Blogs
    
      </h3>

      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse'>
              <thead>
            <tr className="bg-emerald-50 text-emerald-700 text-left text-sm font-medium">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">User</th>
              <th className="p-3 border-b">Comment</th>
              <th className="p-3 border-b">Blog Title</th>
              <th className="p-3 border-b">Date</th>
            </tr>
          </thead>

      <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  Loading comments...
                </td>
              </tr>
            ) : comments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No comments yet.
                </td>
              </tr>
            ) : (
              comments.map((c, index) => (
                <tr key={c._id} className="hover:bg-emerald-50 transition">
                  <td className="p-3 border-b text-gray-700">{index + 1}</td>
                  <td className="p-3 border-b text-gray-700 font-medium">
                    {c.name}
                  </td>
                  <td className="p-3 border-b text-gray-600">{c.comment}</td>
                  <td className="p-3 border-b text-sky-600">{c.blog?.title}</td>
                  <td className="p-3 border-b text-gray-500 text-sm">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default DashboardComments