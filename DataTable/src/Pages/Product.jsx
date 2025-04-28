import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Updatedata from "../Components/Updatedata";
import Sidebar from "../Components/Sidebar";
import Pagination from "../Components/Pagination";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //pagination
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  //sorting
  const [order, setOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParam, setsearchParam] = useSearchParams();
  // read json-server 0.17.4 , all the methods are declared there
  const paramaObj = {
    category: searchParam.getAll("category"),
    _sort: "price",
    _order: order,
    q: search,
    _page: page, 
    _limit: 8,
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/products",{
        params:paramaObj
      })
      .then((res) => {
        setData(res.data);
        settotalPages(res.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  };



  useEffect(() => {
    const id = setTimeout(() => {
      fetchData(paramaObj);
    }, 800);

    //cleanup fun
    return () => {
      clearTimeout(id);
    };
  }, [order, search, searchParam,page]); 


  //delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((res) => {
        alert("Data Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {/* search and sort */}
      <div style={{display:"flex",width:"60%",margin:"auto",marginTop:"30px",justifyContent:"space-around"}}>
      <div>
        <input
          type="text"
          placeholder="search product here"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div >
        <button onClick={() => setOrder("desc")}>High to Low</button>
        <button onClick={() => setOrder("asc")} style={{marginLeft:"30px"}}>Low to High</button>
      </div>
      </div>

      {/* product */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "23%", paddingLeft: "20px" }}>
          <Updatedata />
          <Sidebar />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "50px",
            width: "70%",
            position: "relative",
            top: "20px",
          }}
        >
          {data.map((el) => (
            <div
              key={el.id}
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "whitesmoke",
              }}
            >
              <h3>{el.title}</h3>
              <Link to={`/product/${el.id}`}>
                <img src={el.image} alt={el.title} height={"200px"} />
              </Link>
              <h3>{el.category}</h3>
              <b>
                <p>{el.description}</p>
              </b>
              <h3>${el.price}</h3>
              <button onClick={() => handleDelete(el.id)}>Delete</button>
              {/* <button style={{marginLeft:"20px",padding:"0px 20px"}} >Edit</button> */}
            </div>
          ))}
        </div>
      </div>

      <div style={{margin:"auto",width:"30%",textAlign:"center"}}>
        {/* Pagination */}
        <Pagination
          current={page}
          total={totalPages}
          onChange={(newpage) => setpage(newpage)}
        />
      </div>
    </div>
  );
};

export default Product;
