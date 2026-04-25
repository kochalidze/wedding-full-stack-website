import React, { useState } from "react";
import axios from "axios";

function AddCartButton({ product, userId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      const payload = {
        user_id: userId,
        quantity: 1,
      };
	  console.log(product);
      // თუ dress არის
      if (product.dress_id) {
        payload.dress_id = product.dress_id;
      }

      // თუ decoration არის
      if (product.decoration_id) {
        payload.decoration_id = product.decoration_id;
      }

      const response = await axios.post(
        "http://localhost:8428/api/cart",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cart added:", response.data);
      alert("დაემატა კალათაში!");
    } catch (error) {
      console.error("Cart error:", error);

      const msg =
        error.response?.data?.error ||
        "კალათაში დამატება ვერ მოხერხდა";

      alert("შეცდომა: " + msg);

      if (error.response?.status === 401) {
        alert("გთხოვთ გაიაროთ ავტორიზაცია.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      style={{
        padding: "10px 15px",
        background: isLoading ? "#ccc" : "#ff4d6d",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
}

export default AddCartButton;