import React from "react";
import Logo from "./RecapifyLogo.png";

const App: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={Logo} alt="RecapifyLogo" height="25px" width="25px" style={{ marginBottom: "3px" }} />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: "bold", marginLeft: "10px" }}>Recapify</p>
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", marginTop: "-2px" }}>
        Elevate your browsing experience with Recapify - an innovative AI-powered technology that summarizes any text on web pages with just a click. 
        Get the most out of every page.
      </p>
    </div>
  )
}

export default App;

