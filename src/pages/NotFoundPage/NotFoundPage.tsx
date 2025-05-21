import React from "react";

const NotFoundPage = () => {
  console.log("404 Not Found Page");
  return(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      fontFamily: "Montserrat, sans-serif",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "8rem", margin: 0, fontWeight: 900, letterSpacing: "0.1em" }}>
      404
    </h1>
    <h2 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>Page Not Found</h2>
    <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
      Oops! The page you are looking for does not exist.
    </p>
    <a
      href="/"
      style={{
        padding: "0.75rem 2rem",
        background: "#fff",
        color: "#764ba2",
        borderRadius: "2rem",
        textDecoration: "none",
        fontWeight: 700,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      Go Home
    </a>
  </div>)
};

export default NotFoundPage;