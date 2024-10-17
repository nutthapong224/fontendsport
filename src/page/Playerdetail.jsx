import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Typography, Box } from "@mui/material";

const PlayerDetails = () => {
  const { id } = useParams(); // Retrieve player ID from the route
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/player/${id}`
        );
        setPlayer(response.data); // Store the player data
      } catch (err) {
        console.error("Error fetching player details:", err);
      }
    };

    fetchPlayer();
  }, [id]);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      {player ? (
        <>
          <Avatar
            src={`${import.meta.env.VITE_API_URL}${player.img}`} // Dynamically set the image URL
            alt={`${player.fname} ${player.lname}`}
            sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            {`${player.fname} ${player.lname}`}
          </Typography>
          <Typography variant="h6">{`Campus: ${player.campus}`}</Typography>
          <Typography variant="h6">{`Image Path: ${player.img}`}</Typography>
          <Typography variant="h6">{`Sport: ${player.sporttypes}`}</Typography>
        </>
      ) : (
        <Typography>Loading player details...</Typography>
      )}
    </Box>
  );
};

export default PlayerDetails;
