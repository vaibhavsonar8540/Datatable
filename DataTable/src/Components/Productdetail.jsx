
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px", textAlign: "center" ,width:"70%",margin:"auto",border:"1px solid black",marginTop:"30px"}}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: "300px" }} />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
};

export default Productdetail;

