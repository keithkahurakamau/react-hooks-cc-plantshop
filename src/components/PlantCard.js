import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(plant.price);

  const handleSoldOutToggle = () => {
    setIsSoldOut(!isSoldOut);
  };

  const handlePriceUpdate = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ price: parseFloat(price) }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating price:", error));
  };

  const handleDelete = () => {
    onDeletePlant(plant.id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
          />
          <button onClick={handlePriceUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>Price: {plant.price.toString()}</p>
      )}
      {isSoldOut ? (
        <button>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleSoldOutToggle}>
          In Stock
        </button>
      )}
      <div>
        <button onClick={() => setIsEditing(true)}>Edit Price</button>
        <button onClick={handleDelete} style={{ marginLeft: "5px", backgroundColor: "#ff4444" }}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default PlantCard;
