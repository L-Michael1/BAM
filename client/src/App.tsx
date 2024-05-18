import React, { useState, useEffect } from "react";
import "./App.css";



const buttonHandle = () => {
  const selection = window.getSelection();
  if (selection) {
    console.log(selection.toString());
  }
}

const App: React.FC = () => {
  const [highlightedText, setHighlightedText] = useState<string>('');
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString() : '';

      if (selectedText.length > 0) {
        setHighlightedText(selectedText);
      } else {
        setHighlightedText('');
      }
    }

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, []);

  return (

    <div>
      <div>
        <h1>Scientific Journal Summarizer</h1>
      </div>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <button onClick={buttonHandle}>Press</button>
      <p>{highlightedText}</p>
    </div>
  )
}

export default App;

