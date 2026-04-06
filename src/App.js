// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import trumpImage from "./assets/trump.jpg";
import "./App.css";

// Firebase config
const firebaseConfig = {
  apiKey: "89bfe130020545ca03db2f42412e46e9",
  authDomain: "fatorangecunt.firebaseapp.com",
  databaseURL: "https://fatorangecunt-default-rtdb.firebaseio.com/",
  projectId: "fatorangecunt",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [statusMap, setStatusMap] = useState({});
  const prevStatusRef = useRef({});

  // Listen for changes in Firebase
  useEffect(() => {
    const peopleRef = ref(db, "people");
    let firstLoad = true;

    onValue(peopleRef, (snapshot) => {
      const data = snapshot.val() || {};
      const newStatusMap = {};

      Object.keys(data).forEach((key) => {
        const alive = Boolean(data[key].alive);
        newStatusMap[key] = alive;

        if (!firstLoad && alive === false && prevStatusRef.current[key] !== false) {
          alert("Fat Orange CUNT is DEAD");
        }

        prevStatusRef.current[key] = alive;
      });

      setStatusMap(newStatusMap);
      firstLoad = false;
    });
  }, []);

  // Update browser tab dynamically
  useEffect(() => {
    const overallAlive = Object.values(statusMap).every((v) => v !== false);
    document.title = overallAlive ? "Is he dead yet? Alive" : "Is he dead yet? DEAD";
  }, [statusMap]);

  const overallAlive = Object.values(statusMap).every((v) => v !== false);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Is he dead yet?</h1>
      <img
        src={trumpImage}
        alt="Donald Trump"
        style={{
          width: "300px",
          maxWidth: "80%",
          borderRadius: "12px",
          marginBottom: "1rem",
          boxShadow: "0 8px 20px rgba(22, 19, 19, 0.3)",
        }}
      />
      <p
        className={overallAlive ? "" : "dead-status"}
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: overallAlive ? "green" : "red",
          transition: "all 0.5s ease",
        }}
      >
        {overallAlive ? "Alive" : "Fat Orange CUNT is DEAD"}
      </p>
    </div>
  );
}

export default App;