"use client";
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => console.log("Adding to Cart...")}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
