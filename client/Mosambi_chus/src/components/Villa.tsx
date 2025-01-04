import React from "react";
import Card from "./Card";

function Villa() {
  return (
    <>
      <h1>Welcome to Villa Page</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Card
          imageUrls={[]}
          title="Fontainhas Heritage Walk"
          description="A guided walk through the colorful streets of Goa."
          category="Things To Do"
          address="Fontainhas, Panaji, Goa"
        />

        <Card
          imageUrls={[]}
          title="Goa Kayaking Experience"
          description="Explore the serene backwaters of Goa on a kayak."
          category="Adventure"
          address="Spike's Backwaters, Goa"
        />
      </div>
    </>
  );
}

export default Villa;
