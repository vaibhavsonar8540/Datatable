import axios from 'axios'
import React, { useState } from 'react'

const Updatedata = () => {

    const initialState={
        id:"",
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
      const{id,title,price,description,category,image}=postData

      // update
      const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.put(`http://localhost:3000/products/${id}`, postData)
          .then((res) => {
            alert("Product data updated successfully");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      
  return (
    <div>

        <h3>Update Product from here</h3> <br />
        <form  onSubmit={(e)=>handleSubmit(e)} >
        <input type="text" name="id" value={id} onChange={(e)=>handleChange(e)} placeholder="id"/> <br /> <br />
        <input type="text" name="title" value={title} onChange={(e)=>handleChange(e)} placeholder="title"/> <br /> <br />
        <input type="text" name="description" value={description} onChange={(e)=>handleChange(e)} placeholder="description"/> <br /> <br />
        <input type="text" placeholder="image"  name="image" value={image} onChange={(e)=>handleChange(e)}/> <br /> <br />
        <select  id=""  name="category" value={category} onChange={(e)=>handleChange(e)}> 
          <option value="select">select option</option>
          <option value="Male Cloths">Male</option>
          <option value="Women Cloths">Women</option>
          <option value="Electronics">Electronics</option>
          <option value="jewelery">jewelery</option>
        </select> <br /> <br />
        <input type="number" name="price" value={price} onChange={(e)=>handleChange(e)} placeholder="price"/> <br /> <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Updatedata