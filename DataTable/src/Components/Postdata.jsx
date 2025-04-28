import axios from 'axios'
import React, { useState } from 'react'

const Postdata = () => {
    const initialState={
        title:"",
        price:"",
        description:"",
        category:"",
        image:""
      }
      const[postData,setpostData]=useState(initialState)
      const handleChange=(e)=>
      {
        setpostData({...postData,[e.target.name]:e.target.value})
      }
      //value
      const{title,price,description,category,image}=postData
      

      //post
      const handleSubmit = (e) =>
      {
        e.preventDefault()
      axios.post("http://localhost:3000/products",postData)
      .then((res)=>{
        alert("product data add successfully")
        window.location.reload();
      })
      .catch((err)=>{
        console.log(err)
      })
      }
  return (
    <div  style={{width:"25%",margin:"auto",textAlign:"center",border:"1px solid black",padding:"30px 15px",borderRadius:"20px",marginTop:"50px"}}>

        <h1>Add Product from here</h1> <br />

        <form className="postdata " onSubmit={(e)=>handleSubmit(e)} >
        <input type="text" name="title" value={title} onChange={(e)=>handleChange(e)} placeholder="title"/> <br /> <br />
        <input type="text" placeholder="image"  name="image" value={image} onChange={(e)=>handleChange(e)}/> <br /> <br />
        <input type="text" name="description" value={description} onChange={(e)=>handleChange(e)} placeholder="description"/> <br /> <br />
        <select  id=""  name="category" value={category} onChange={(e)=>handleChange(e)}> 
          <option value="select">select option</option>
          <option value="Male Cloths">Male</option>
          <option value="Women Cloths">Women</option>
          <option value="Electronics">Electronics</option>
        </select> <br /> <br />
        <input type="number" name="price" value={price} onChange={(e)=>handleChange(e)} placeholder="price"/> <br /> <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Postdata