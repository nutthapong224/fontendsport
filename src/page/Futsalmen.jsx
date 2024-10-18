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
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom";

const Futsalmen = () => {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState({
    title: "",
    fname: "",
    lname: "",
    sporttypes: "ฟุตซอลชาย",
    campus: "",
    studentid: "",
  });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [titles, setTitles] = useState([]);
  const [campuses, setCampuses] = useState([]);

  // Fetch titles and campuses from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [titlesRes, campusesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/titles`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/campuses`),
        ]);
        setTitles(titlesRes.data);
        setCampuses(campusesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  // Handle input changes
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
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", playerData.title);
      formData.append("fname", playerData.fname);
      formData.append("lname", playerData.lname);
      formData.append("campus", playerData.campus);
      formData.append("sporttypes", playerData.sporttypes);
      formData.append("studentid", playerData.studentid);
      formData.append("img", imageFile); // Append the actual image file

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/players/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type for file uploads
          },
        }
      );

      setMessage(response.data.message); // Show success message

      // Navigate to a different route on success
      navigate("/searchplayers");

      // Reset the form
      setPlayerData({
        title: "",
        fname: "",
        lname: "",
        sporttypes: "",
        campus: "",
        studentid: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage(
        error.response ? error.response.data.message : "An error occurred."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            ฟุตซอลชาย
          </Typography>
          {message && <Alert severity="info">{message}</Alert>}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="รหัสนักศึกษา"
              name="studentid"
              value={playerData.studentid}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="title">คำนำหน้า</InputLabel>
              <Select
                labelId="title"
                name="title"
                value={playerData.title}
                onChange={handleChange}
              >
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

export default Futsalmen;
