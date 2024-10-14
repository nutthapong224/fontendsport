import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { apiRequest } from "../api"; // Adjust the import path as necessary
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
} from "@mui/material"; // Import Material-UI components

const SearchCoaches = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [campus, setCampus] = useState(""); // State for selected campus
  const [coaches, setCoaches] = useState([]);
  const [campuses, setCampuses] = useState([]); // State for campuses
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sportTypes, setSportTypes] = useState([]); // State for sport types
  const [sportType, setSportType] = useState(""); // State for selected sport type
  const navigate = useNavigate(); // Initialize navigate
  // Fetch campuses on component mount
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
        setSportTypes(response); // Update the sport types state with fetched data
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
        import.meta.env.VITE_API_URL + "/api/coaches/search",
        {
          params: {
            coach_fname: fname,
            coach_lname: lname,
            campus,
            sporttypes: sportType,
          },
        }
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setCoaches(response.data);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError("No coaches found or an error occurred");
      setCoaches([]); // Reset coaches state on error
      console.error(err); // Log error for debugging
    }
  };

  const handleChange = (event) => {
    setCampus(event.target.value);
  };

  // Handle change for sport type dropdown
  const handleSportTypeChange = (event) => {
    setSportType(event.target.value);
  };

  const handleCampusChange = (event) => {
    setCampus(event.target.value);
  };

  // Function to handle button click for viewing details
  const handleViewDetails = (coach) => {
    // Implement the logic to view coach details, e.g., navigate to a details page or show a modal
  
       navigate(`/coach/${coach.coach_id}`);

  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        ค้นหาผู้คุมทีม
      </Typography>

      {/* Search Fields */}
      <Grid
        container
        spacing={2}
        justifyContent="center" // Center items horizontally
        style={{
          maxWidth: "600px", // Set max width for the entire form
          margin: "0 auto", // Center the form horizontally
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="ชื่อ"
            variant="outlined"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            fullWidth
            style={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="นามสกุล"
            variant="outlined"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            fullWidth
            style={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            required
            style={{
              marginTop: "10px",
              width: "100%",
            }}
          >
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
          <FormControl
            required
            style={{
              marginTop: "10px",
              width: "100%",
            }}
          >
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
            style={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {message}
        </Typography>
      )}

      <Typography variant="h5" style={{ marginTop: "30px" }}>
        รายละเอียด
      </Typography>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center items horizontally
          justifyContent: "center", // Center items vertically
          marginTop: "20px",
          padding: "0",
          width: "100%",
          maxWidth: "600px", // Set a max width for the list
          margin: "0 auto", // Center the list in the container
        }}
      >
        {Array.isArray(coaches) && coaches.length > 0 ? (
          coaches.map((coach) => (
            <ListItem
              key={coach.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                width: "100%", // Ensure the list item takes full width
              }}
            >
              {coach.coach_img && (
                <ListItemAvatar>
                  <Avatar
                    src={coach.coach_img}
                    alt={`${coach.coach_fname} ${coach.coach_lname}`}
                  />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={`${coach.coach_fname} ${coach.coach_lname}`}
                style={{ marginLeft: coach.coach_img ? "10px" : "0" }}
              />
              <Button
                variant="outlined"
                onClick={() => handleViewDetails(coach)} // Handle button click
                sx={{ marginLeft: "10px" }}
              >
                View Details
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem style={{ justifyContent: "center", width: "100%" }}>
            กรุณาเลือกวิทยาเขต กับ ประเภทกีฬา
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default SearchCoaches;
