import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import ImageUpload from "./ImageUpload";
import axios from "axios";

const PostYourExp = (): JSX.Element => {
  // const [images, setImages] = useState<File[]>([]);
  const [formValues, setFormValues] = useState({
    category: "",
    name: "",
    description: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (
      !formValues.category ||
      !formValues.name ||
      !formValues.description ||
      !formValues.address
      // ||
      // images.length === 0
    ) {
      handleError("Please fill out all fields and upload at least one image!");
      return;
    }

    try {
      // Prepare the form data
      const formData = new FormData();
      // Append values safely
      formData.append("category", formValues.category || "");
      formData.append("name", formValues.name || "");
      formData.append("description", formValues.description || "");
      formData.append("address", formValues.address || "");

      // Log formData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Should log all entries
      }
      // formData.append("image", images[0]); // Assuming single image for simplicity

      // Append images to the form data
      // images.forEach((image, index) => {
      //   formData.append(`images`, image);
      // });
      console.log(formValues.category);
      console.log(formValues.name);
      console.log(formValues.description);
      console.log(formValues.address);
      console.log("reached till here");
      console.log(formData);
      // Send POST request to the backend
      const response = await axios.post(
        "http://localhost:5050/api/page/postExperience",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log("reached till here 1");
      // Handle success response

      handleSuccess("Your experience has been successfully posted.");

      console.log("Response from server:", response.data);

      // Reset form values
      setFormValues({
        category: "",
        name: "",
        description: "",
        address: "",
      });
      // setImages([]);
    } catch (error) {
      // Handle error

      handleError("Something went wrong! Please try again later.");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Post your Experience</h2>

        {/* Dropdown */}
        <label style={styles.label} htmlFor="category">
          Category
        </label>
        <select
          style={styles.input}
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          <option value="villa">Villa</option>
          <option value="things-to-do">Things To Do</option>
          <option value="restaurants">Restaurants</option>
        </select>

        {/* Name */}
        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          placeholder="Enter Name..."
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        {/* Image Upload */}
        <label style={styles.label} htmlFor="Images">
          Upload Images
        </label>
        <ImageUpload />

        {/* Description */}
        <label style={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          placeholder="Enter a brief description"
          onChange={handleInputChange}
          style={styles.textarea}
          required
        />

        {/* Address */}
        <label style={styles.label} htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formValues.address}
          placeholder="Enter Address..."
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

// Inline styles for simplicity
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f5fc",
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "600px",
  },
  header: {
    color: "#5d3fd3",
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#5d3fd3",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    fontSize: "14px",
    minHeight: "80px",
  },
  inputFile: {
    marginBottom: "15px",
  },
  imagePreview: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#5d3fd3",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default PostYourExp;
