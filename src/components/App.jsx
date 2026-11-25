import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [toys, setToys] = useState([]);
//fetch all toys once when the page loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
//add a new toy to the end of the toys array in state, keeping the same order
  function handleAddToy(newToy) {
  setToys((toys) => [...toys, newToy]);
}
//replace one toy, keeping the same order
function handleUpdateToy(updatedToy) {
  setToys((toys) =>
    toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
  );
}
//Remove toy with specified id from state when deleted
function handleDeleteToy(id) {
  setToys((toys) => toys.filter((toy) => toy.id !== id));
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
      toys={toys}
      onUpdateToy={handleUpdateToy}
      onDeleteToy={handleDeleteToy}
       />
    </>
  );
}

export default App;
