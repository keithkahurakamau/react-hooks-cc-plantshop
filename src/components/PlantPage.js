import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const addPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New plant added:", data);
        setPlants([...plants, data]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  const updatePlant = (updatedPlant) => {
    setPlants(plants.map(plant => 
      plant.id === updatedPlant.id ? updatedPlant : plant
    ));
  };

  const deletePlant = (plantId) => {
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlants(plants.filter(plant => plant.id !== plantId));
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList 
        plants={filteredPlants} 
        onUpdatePlant={updatePlant}
        onDeletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
