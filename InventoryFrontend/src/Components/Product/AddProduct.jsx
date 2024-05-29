import { useState, useEffect } from "react";
import ProductService from "../../Api/ProductService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate
  // Input state and validation
  const NUMBER_REGEX = /^[0-9\b]+$/;
  const [productName, setProductName] = useState("");
  const [validName, setValidName] = useState(false);

  const [category, setCategory] = useState("");
  const [validCategory, setValidCategory] = useState(false);

  const [productPrice, setProductPrice] = useState("");
  const [validProductPrice, setValidProductPrice] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(!NUMBER_REGEX.test(productName));
  }, [productName]);

  useEffect(() => {
    setValidCategory(!NUMBER_REGEX.test(category));
  }, [category]);

  useEffect(() => {
    setValidProductPrice(
      NUMBER_REGEX.test(productPrice) && parseFloat(productPrice) > 0
    );
  }, [productPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validName || !validCategory || !validProductPrice) {
      setErrMsg("Please make sure that all fields are filled correctly!");
      return;
    }

    setErrMsg("");

    const productData = {
      productName,
      category,
      productPrice: parseFloat(productPrice),
    };

    try {
      const response = await ProductService.addProduct(productData);
      if (response.status === 201 && response.data) {
        toast.success("Product added successfully!");
        navigate("/products");
      } else {
        toast.error(response.data.message);
        setErrMsg(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product.");
      setErrMsg("Failed to add product.");
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            autoComplete="off"
          />
          {productName && !validName && (
            <p className="error-message">Invalid product name</p>
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            autoComplete="off"
          />
          {category && !validCategory && (
            <p className="error-message">Invalid category</p>
          )}
        </div>
        <div className="form-group">
          <label>Unit Price</label>
          <input
            type="text"
            name="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            autoComplete="off"
          />
          {productPrice && !validProductPrice && (
            <p className="error-message">Invalid price</p>
          )}
        </div>
        {errMsg && <p className="error">{errMsg}</p>}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
