import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { apiRequest } from "../api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Exportcoach = () => {
  const [campus, setCampus] = useState("");
  const [sportType, setSportType] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [sportTypes, setSportTypes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleExport = async () => {
    try {
      // Build the query string based on the selected filters
      const queryParams = new URLSearchParams();
      if (campus) queryParams.append("campus", campus);
      if (sportType) queryParams.append("sportType", sportType);

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/excelcoach?${queryParams.toString()}`,
        {
          responseType: "blob", // Ensure the response is a binary file
        }
      );

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "coach.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
    }
  };

  const handleReset = () => {
    // Reset campus and sportType values to empty strings
    setCampus("");
    setSportType("");
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user data, tokens)
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to the login page
  };

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
      }
    };

    fetchSportTypes();
  }, []);

  const handleCampusChange = (event) => {
    setCampus(event.target.value);
  };

  const handleSportTypeChange = (event) => {
    setSportType(event.target.value);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Campus Selection */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="campus-label">วิทยาเขต</InputLabel>
          <Select
            labelId="campus-label"
            name="campus"
            value={campus}
            onChange={handleCampusChange}
          >
            {campuses.map((campus) => (
              <MenuItem key={campus.campus_id} value={campus.campus_name}>
                {campus.campus_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Sport Type Selection */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="sporttypes-label">ประเภทกีฬา</InputLabel>
          <Select
            labelId="sporttypes-label"
            name="sporttypes"
            value={sportType}
            onChange={handleSportTypeChange}
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

      {/* Export Button */}
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          sx={{ marginTop: "20px" }}
        >
          Export to Excel
        </Button>
      </Grid>

      {/* Reset Button */}
      <Grid item xs={6}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          sx={{ marginTop: "20px" }}
        >
          Reset Filters
        </Button>
      </Grid>

      {/* Logout Button */}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{ marginTop: "20px" }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Exportcoach;
