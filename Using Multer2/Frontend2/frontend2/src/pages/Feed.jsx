import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'

const Feed = () => {
   const [posts,setPosts] =useState([
    {
        _id: "69935fa2c54febd375493f38",
        image: "https://ik.imagekit.io/u5ia4v8ic/image_Qb2bdAyKK.jpg",
        caption: "Beautiful Scenry"
    }
   ])

   useEffect(() =>{
    axios.get("http://localhost:3005/post")
      .then((res) =>{
        setPosts(res.data.post)
      })
   },[])
   return(
        <section className="feed-section">
            {
                posts.length >0 ?(
                    posts.map((post) =>(
                        <div key={post._id} className='post-card'>
                           <img src ={post.image} alt={post.caption}/>
                           <p>{post.caption}</p>
                        </div>
                    ) )
                     
                ) : (
                    <h3>No Posts Available</h3>
                )
            }
        </section>
   )   
}

export default Feed