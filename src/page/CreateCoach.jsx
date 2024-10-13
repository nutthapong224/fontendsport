import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { apiRequest, handleFileUpload } from "../api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreateCoach = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [coachData, setCoachData] = useState({
    title: "",
    coach_fname: "",
    coach_lname: "",
    sporttypes: "",
    campus: "", // Add campus field
  });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [titles, setTitles] = useState([]); // State to store fetched titles
  const [campuses, setCampuses] = useState([]); // State to store fetched campuses
  const [sportTypes, setSportTypes] = useState([]); // State to store fetched sport types

  // Fetch titles from API when component mounts
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await apiRequest({
          url: "/api/titles",
          method: "GET",
        });
        setTitles(response); // Update the titles state with fetched data
      } catch (error) {
        console.error("Error fetching titles:", error);
        setMessage("Failed to load titles.");
      }
    };

    fetchTitles();
  }, []);

  // Fetch campuses from API when component mounts
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await apiRequest({
          url: "/api/campuses", // Update with your API endpoint
          method: "GET",
        });
        setCampuses(response); // Update the campuses state with fetched data
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
          url: "/api/sporttypes", // Your API endpoint for sport types
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage("Please upload an image.");
      return; // Exit early if no image is provided
    }

    try {
      // Upload image to Cloudinary and get the URL
      const imageUrl = await handleFileUpload(imageFile);

      // Prepare the data to send to your backend
      const dataToSend = {
        ...coachData,
        coach_img: imageUrl, // Add the uploaded image URL
      };

      // Send the data to your backend API
      const response = await apiRequest({
        url: "/api/coaches/create",
        data: dataToSend,
        method: "POST",
      });

      setMessage(response.message); // Show success message

      // Navigate to the /searchcoach route on success
      navigate("/searchcoach");

      // Reset the form
      setCoachData({
        title: "",
        coach_fname: "",
        coach_lname: "",
        sporttypes: "",
        campus: "", // Reset campus
      });
      setImageFile(null);
    } catch (error) {
      setMessage(error.message); // Show error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            ผู้คุมนักกีฬา
          </Typography>
          {message && <Alert severity="info">{message}</Alert>}{" "}
          {/* Display messages */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="title">คำนำหน้า</InputLabel>
              <Select
                labelId="title"
                name="title"
                value={coachData.title}
                onChange={handleChange}
              >
                {/* Map over titles state to create dropdown options */}
                {titles.map((title) => (
                  <MenuItem key={title.title_id} value={title.title_name}>
                    {title.title_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="ชื่อ"
              name="coach_fname"
              value={coachData.coach_fname}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="นามสกุล"
              name="coach_lname"
              value={coachData.coach_lname}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              select // Make the TextField a dropdown
              label="ประเภทกีฬา" // Label for the dropdown
              name="sporttypes" // Name for the field
              value={coachData.sporttypes} // Bind value to sport types
              onChange={handleChange} // Handle change
              required
              fullWidth
              margin="normal"
            >
              {sportTypes.map((sportType) => (
                <MenuItem
                  key={sportType.sporttypes_id}
                  value={sportType.sporttypes_name}
                >
                  {sportType.sporttypes_name}{" "}
                  {/* Display the sport type name */}
                </MenuItem>
              ))}
            </TextField>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="campus">วิทยาเขต</InputLabel>
              <Select
                labelId="campus"
                name="campus" // Set name for campus
                value={coachData.campus} // Bind value to campus
                onChange={handleChange} // Handle change
              >
                {/* Map over campuses state to create dropdown options */}
                {campuses.map((campus) => (
                  <MenuItem key={campus.campus_id} value={campus.campus_name}>
                    {campus.campus_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{ marginTop: 16, marginBottom: 16 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ display: "block", mx: "auto" }} // Center the button
            >
              ลงทะเบียน
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateCoach;
