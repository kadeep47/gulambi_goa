import React from "react";

interface CardProps {
  key: string;
  // imageUrls: string[]; // URLs of images to display
  title: string; // Name of the experience
  description: string; // Short description
  category: string; // Category of the experience
  address: string; // Address of the experience
}

const Card = ({
  key,
  // imageUrls,
  title,
  description,
  category,
  address,
}: CardProps): JSX.Element => {
  return (
    <div style={styles.card}>
      {/* Image Section */}
      {/* <div style={styles.imageContainer}>
        {imageUrls.slice(0, 3).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            style={styles.image}
          />
        ))}
      </div> */}

      {/* Card Content */}
      <div style={styles.content}>
        {/* Title */}
        <h3 style={styles.title}>{title}</h3>

        {/* Category */}
        <p style={styles.category}>{category}</p>

        {/* Description */}
        <p style={styles.description}>{description}</p>

        {/* Address */}
        <p style={styles.address}>
          <strong>Address:</strong> {address}
        </p>
      </div>
    </div>
  );
};

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    margin: "15px",
  },
  imageContainer: {
    display: "flex",
    gap: "5px",
    justifyContent: "center",
    overflow: "hidden",
    padding: "10px",
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  category: {
    fontSize: "14px",
    color: "#5d3fd3",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  address: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
};

export default Card;
