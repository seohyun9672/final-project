import { useState } from "react";
import axios from "axios";

export default function AddChannelForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    servingSize: "",
    totalTime: "",
    rating: "",
    ingredients: "",
    instructions: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("/api/channels", formData);
      onAdd(res.data);
      setFormData({
        title: "",
        img: "",
        servingSize: "",
        totalTime: "",
        rating: "",
        ingredients: "",
        instructions: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit} className="card add">
      <h1 className="card-title">Add your own recipe</h1>
      <div className="input-cont">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="img">Image</label>
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="servingSize">Serving Size</label>
        <input
          type="text"
          name="servingSize"
          value={formData.servingSize}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="totalTime">Total Time</label>
        <input
          type="text"
          name="totalTime"
          value={formData.totalTime}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-cont">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
        />
      </div>
      <button className="button-secondary" type="submit">Add Recipe</button>
    </form>
  );
};

