import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

type Card = {
  _id: string;
  category: string;
  name: string;
  description: string;
  address: string;
};

function Goa() {
  const [cards, setCards] = useState<Card[]>([]);
  // Fetch cards from the backend on component mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/page/");
        setCards(response.data); // Set the fetched cards in state
      } catch (error) {
        console.error("Failed to fetch cards", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h1>Welcome to Goa Page</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={card._id}
              title={card.name}
              description={card.description}
              category={card.category}
              address={card.address}
            />
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
    </div>
  );
}

export default Goa;
