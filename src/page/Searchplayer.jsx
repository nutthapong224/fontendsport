import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { apiRequest } from "../api";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const SearchPlayers = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [campus, setCampus] = useState("");
  const [sportType, setSportType] = useState("");
  const [players, setPlayers] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [sportTypes, setSportTypes] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await apiRequest({
          url: "/api/campuses",
          method: "GET",
        });
        setCampuses(response);
      } catch (error) {
        console.error("Error fetching campuses:", error);
        setMessage("Failed to load campuses.");
      }
    };

    fetchCampuses();
  }, []);

  useEffect(() => {
    const fetchSportTypes = async () => {
      try {
        const response = await apiRequest({
          url: "/api/sporttypes",
          method: "GET",
        });
        setSportTypes(response);
      } catch (error) {
        console.error("Error fetching sport types:", error);
        setMessage("Failed to load sport types.");
      }
    };

    fetchSportTypes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/players/search",
        {
          params: {
            fname,
            lname,
            campus,
            sporttypes: sportType,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setPlayers(response.data);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError("No players found or an error occurred");
      setPlayers([]);
      console.error(err);
    }
  };

  const handleCampusChange = (event) => {
    setCampus(event.target.value);
  };

  const handleSportTypeChange = (event) => {
    setSportType(event.target.value);
  };

  // Handle the button click to navigate to player details page
  const handleButtonClick = (player) => {
  
    navigate(`/player/${player.player_id}`);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        ค้นหาผู้เล่น
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="ชื่อ"
            variant="outlined"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            fullWidth
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="นามสกุล"
            variant="outlined"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            fullWidth
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ marginTop: "10px", width: "100%" }}>
            <InputLabel id="campus-label">วิทยาเขต</InputLabel>
            <Select
              labelId="campus-label"
              name="campus"
              value={campus}
              onChange={handleCampusChange}
              size="medium"
            >
              {campuses.map((campus) => (
                <MenuItem key={campus.campus_id} value={campus.campus_name}>
                  {campus.campus_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ marginTop: "10px", width: "100%" }}>
            <InputLabel id="sporttypes-label">ประเภทกีฬา</InputLabel>
            <Select
              labelId="sporttypes-label"
              name="sporttypes"
              value={sportType}
              onChange={handleSportTypeChange}
              size="medium"
            >
              {sportTypes.map((sportType) => (
                <MenuItem
                  key={sportType.sporttypes_id}
                  value={sportType.sporttypes_name}
                >
                  {sportType.sporttypes_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography color="error" sx={{ marginTop: "20px" }}>
          {message}
        </Typography>
      )}

      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        ผลลัพท์
      </Typography>
      <List
        sx={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Array.isArray(players) && players.length > 0 ? (
          players.map((player) => (
            <ListItem
              key={player.id}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                alignItems: "center",
              }}
            >
              {player.img && (
                <ListItemAvatar>
                  <Avatar
                    src={`${import.meta.env.VITE_API_URL}${player.img}`} 
                    alt={`${player.fname} ${player.lname}`}
                    sx={{ width: "50px", height: "50px" }}
                  />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={`${player.fname} ${player.lname}`}
                sx={{ marginLeft: player.img ? "10px" : "0" }}
              />
              <Button
                variant="outlined"
                onClick={() => handleButtonClick(player)}
                sx={{ marginLeft: "10px" }}
              >
                View Details
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ justifyContent: "center" }}>
            กรุณาเลือกวิทยาเขต กับ ประเภทกีฬา
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SearchPlayers;
