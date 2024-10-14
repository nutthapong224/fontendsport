import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Typography, Box } from "@mui/material";

const CoachDetail = () => {
  const { id } = useParams(); // Retrieve coach ID from the route
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/api/coaches/${id}`
        );
        setCoach(response.data);
      } catch (err) {
        console.error("Error fetching coach details:", err);
      }
    };

    fetchCoach();
  }, [id]);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      {coach ? (
        <>
          <Avatar
            src={coach.coach_img} 
            alt={`${coach.coach_fname} ${coach.coach_lname}`}
            sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            {`${coach.coach_fname} ${coach.coach_lname}`} 
          </Typography>
          <Typography variant="h6">{`Campus: ${coach.campus}`}</Typography>
          <Typography variant="h6">{`Sport: ${coach.sporttypes}`}</Typography>{" "}
          <Typography variant="h6">{`Title: ${coach.title}`}</Typography>
        </>
      ) : (
        <Typography>Loading coach details...</Typography>
      )}
    </Box>
  );
};

export default CoachDetail;
