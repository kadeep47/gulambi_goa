import React, { useState } from "react";

const ImageUpload = (): React.ReactNode => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  return (
    <div style={styles.container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} style={styles.uploadBox}>
          {images[index] ? (
            <div style={styles.imagePreview}>
              <img
                src={URL.createObjectURL(images[index])}
                alt="Preview"
                style={styles.image}
              />
              <button
                style={styles.removeButton}
                onClick={() => {
                  const newImages = [...images];
                  newImages.splice(index, 1);
                  setImages(newImages);
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <label htmlFor={`image-upload-${index}`} style={styles.label}>
                Click to Upload
              </label>
              <input
                type="file"
                id={`image-upload-${index}`}
                accept="image/*"
                style={styles.fileInput}
                onChange={(e) => handleImageChange(e, index)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  uploadBox: {
    width: "120px",
    height: "120px",
    border: "2px dashed #5d3fd3",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",
    backgroundColor: "#f9f7fc",
  },
  label: {
    color: "#5d3fd3",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  fileInput: {
    display: "none",
  },
  imagePreview: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  removeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

export default ImageUpload;
