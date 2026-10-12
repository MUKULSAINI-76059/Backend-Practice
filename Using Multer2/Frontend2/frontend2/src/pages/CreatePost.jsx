import React ,{useState , useEffect } from 'react';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const  CreatePost = () =>{
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [hover, setHover] = useState(false);
   useEffect(() => {
    alert("Thanks For Coming My Website🙏, Jai Shree Ram🚩");
  }, []);

  const handleSubmit = async (e) =>{

  e.preventDefault();
  const formData = new FormData(e.target);

  try{
     await axios.post("http://localhost:3005/create-post",formData)
     alert("Congratulation your post created successfully 🥳");
    setImage(null);
    setCaption("");
    e.target.reset();
    navigate("/feed");

  }catch(err) {
     console.log(err)
     alert("Error Creating Post");
  }
};

  return (
    
    <section className='create-post-section'>
        <h1>Create Post</h1>
         
          <a
      href="/feed"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginBottom: "20px",
        display: "inline-block",
        color: hover ? "#1e40af" : "#2563eb",
        transform: hover ? "translateX(-6px)" : "translateX(0)",
        transition: "all 0.3s ease",
        textDecoration: hover ? "underline" : "none",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      ⬅ Go to Feed
    </a>
        <form onSubmit={handleSubmit} >
            <input type="file" name='image' accept='image/*'/>
            <input type="text" name="caption" placeholder='Enter Caption' required />
            <button type="submit">Submit</button>
        </form>
    </section>
  );
};

export default CreatePost