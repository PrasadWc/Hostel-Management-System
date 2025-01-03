import React, { useState } from "react";
import axios from "axios";

const Distance = () => {
  const [userAddress, setUserAddress] = useState("");

  const handleCalculateDistance = async () => {
    const apiKey = "API key";
    const fixedLocation = "7.464703061231379, 80.02165005401687";

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/distancematrix/json",
        {
          params: {
            origins: fixedLocation,
            destinations: userAddress,
            key: apiKey,
          },
        }
      );

      console.log("API Response:", response.data);

      // Check if the necessary properties exist in the response
      if (
        response.data.rows &&
        response.data.rows.length > 0 &&
        response.data.rows[0].elements &&
        response.data.rows[0].elements.length > 0 &&
        response.data.rows[0].elements[0].distance &&
        response.data.rows[0].elements[0].distance.text
      ) {
        // Extract distance from the response
        const distance = response.data.rows[0].elements[0].distance.text;

        // Use the distance as needed
        console.log("Distance:", distance);
      } else {
        console.error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
    </div>
  );
};

export default Distance;
