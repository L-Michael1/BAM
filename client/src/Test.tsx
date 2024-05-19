import React, { useState, useEffect } from "react";
import "./App.css";

const Test: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : "";
    setSelectedText(text);
  };

  const handleButtonClick = () => {
    if (selectedText) {
      setIsLoading(true);
      fetch("http://127.0.0.1:8000/summarize-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: selectedText }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Summary:", data.summary);
          setIsLoading(false);
        })
        .catch((error) => {
          alert("There was an error with the summary\n" + error);
          setIsLoading(false);
        });
    } else {
      alert("Please select text before summarizing");
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div>
      <button
        id="summarizeButton"
        onClick={handleButtonClick}
        disabled={isLoading}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
          padding: "15px 20px",
          backgroundColor: "#a044fc",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          fontSize: "1.1rem",
          fontWeight: "bold",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          opacity: selectedText ? 1 : 0,
          pointerEvents: selectedText ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        {isLoading ? "Loading..." : "Summarize"}
      </button>
    </div>
  );
};

export default Test;