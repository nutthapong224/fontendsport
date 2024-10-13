import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { apiRequest, handleFileUpload } from "../api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Tabletenisdoublemen = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [playerData, setPlayerData] = useState({
    title: "",
    fname: "",
    lname: "",
    sporttypes: "เทเบิลเทนนิสคู่ชาย",
    campus: "", // Campus field
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
          url: "/api/campuses",
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

  // Fetch sport types from API when component mounts
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => ({
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
        ...playerData,
        img: imageUrl, // Add the uploaded image URL to 'img'
      };

      // Send the data to your backend API
      const response = await apiRequest({
        url: "/api/players/create", // Update the URL based on your endpoint
        data: dataToSend,
        method: "POST",
      });

      setMessage(response.message); // Show success message

      // Navigate to a different route on success
      navigate("/searchplayers");

      // Reset the form
      setPlayerData({
        title: "",
        fname: "",
        lname: "",
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
            เทเบิลเทนนิสคู่ชาย
          </Typography>
          {message && <Alert severity="info">{message}</Alert>}{" "}
          {/* Display messages */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="title">คำนำหน้า</InputLabel>
              <Select
                labelId="title"
                name="title"
                value={playerData.title}
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
              name="fname"
              value={playerData.fname}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="นามสกุล"
              name="lname"
              value={playerData.lname}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="campus">วิทยาเขต</InputLabel>
              <Select
                labelId="campus"
                name="campus"
                value={playerData.campus}
                onChange={handleChange}
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

export default Tabletenisdoublemen;
