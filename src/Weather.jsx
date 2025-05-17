import React, { useState } from "react";

const WeatherApp = () => {
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState({ city: "", district: "", state: "" });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);

  const handlePincode = async (pin) => {
    setPincode(pin);
    if (pin.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const loc = data[0].PostOffice[0];
          setLocation({ city: loc.Name, district: loc.District, state: loc.State });
        } else {
          alert("Invalid pincode.");
          setLocation({ city: "", district: "", state: "" });
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong. Try again.");
        setLocation({ city: "", district: "", state: "" });
      }
    } else {
      setLocation({ city: "", district: "", state: "" });
    }
  };

  const getWeather = () => {
    if (!location.city || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    // Mock data (replace with actual API call)
    setWeather({
      datetime: `${date} ${time}`,
      temperature: "29°C",
      description: "Clear Sky"
    });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌦 Weather Forecast</h1>

        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => handlePincode(e.target.value)}
            style={styles.input}
          />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} />
          <button onClick={getWeather} style={styles.button}>Get Weather</button>
        </div>

        <div style={styles.card}>
          <h2 style={{ color: "#d81b60" }}>Weather Info</h2>
          <p>📍 Location: {location.city ? `${location.city}, ${location.district}, ${location.state}` : "-"}</p>
          <p>🕒 Date/Time: {weather ? weather.datetime : "-"}</p>
          <p>🌡 Temperature: {weather ? weather.temperature : "-"}</p>
          <p>☁ Description: {weather ? weather.description : "-"}</p>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  body: {
    position: "fixed",                    // Stay fixed in the viewport
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",                      // Fill the whole screen
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",                  // Prevent scrolling
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  container: {
    background: "#fff",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center",
    boxSizing: "border-box",
  },
  title: {
    color: "#d81b60",
    marginBottom: "1rem",
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "200px",
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  card: {
    background: "#babypink",
    borderRadius: "15px",
    padding: "1rem",
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.05)",
  },
};


export default WeatherApp;
