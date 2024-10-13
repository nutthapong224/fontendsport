import React from "react";
import { Button, Grid2, ImageListItem, Typography, Box } from "@mui/material"; // Import Grid2 instead of Grid
import { useNavigate } from "react-router-dom";
import playerIcon from "../assets/icon.jpg"; // Import the image

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Full height to center vertically
        textAlign: "center",
        padding: { xs: "20px", md: "40px" }, // Adjust padding for larger screens
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} // Responsive font size
      >
        ลงทะเบียนนักกีฬา/ผู้ควบคุมทีม
      </Typography>

      {/* Grid for responsive layout */}
      <Grid2
        container
        spacing={2} // Increased spacing for better layout on larger screens
        justifyContent="center"
        sx={{ marginBottom: { xs: "10px", sm: "15px", md: "20px" } }} // Adjust margin for mobile and larger screens
      >
        {/* Team Manager Section */}
        <Grid2
          item
          xs={12}
          sm={6}
          md={5} // Increased size for desktop
          onClick={() => navigate("/createcoach")}
          style={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center", // Ensure text alignment for larger screens
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: { xs: "5px", sm: "10px" }, // Adjust margin for mobile
                fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
              }}
            >
              อาจารย์/เจ้าหน้าที่ผู้คุมนักกีฬา
            </Typography>
            <ImageListItem>
              <img
                src={playerIcon}
                alt="Coach"
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "180px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </ImageListItem>
          </Box>
        </Grid2>

        {/* Player Section */}
        <Grid2
          item
          xs={12}
          sm={6}
          md={5} // Increased size for desktop
          onClick={() => navigate("/createplayer")}
          style={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center", // Ensure text alignment for larger screens
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: { xs: "5px", sm: "10px" }, // Adjust margin for mobile
                fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
              }}
            >
              นักศึกษาที่ลงแข่งขัน
            </Typography>
            <ImageListItem>
              <img
                src={playerIcon}
                alt="Players"
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "180px", // Adjust image size for larger screens
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </ImageListItem>
          </Box>
        </Grid2>
      </Grid2>

      {/* Buttons */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: { xs: "5px", sm: "10px" }, // Adjust margin for mobile
          fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
        }}
      >
        ค้นหานักกีฬา/ผู้ควบคุมทีม
      </Typography>
      <Grid2
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginTop: { xs: 2, md: 3 } }}
      >
        <Grid2 item>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: { xs: "8px 16px", sm: "10px 20px" }, // Smaller padding for mobile
              fontSize: { xs: "12px", sm: "16px" }, // Smaller font size for mobile
              width: { xs: "100%", sm: "auto" }, // Full width on small screens
            }}
            onClick={() => navigate("/searchcoach")}
          >
            เจ้าหน้าที่ผู้คุมนักกีฬา
          </Button>
        </Grid2>
        <Grid2 item>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              padding: { xs: "8px 16px", sm: "10px 20px" }, // Smaller padding for mobile
              fontSize: { xs: "12px", sm: "16px" }, // Smaller font size for mobile
              width: { xs: "100%", sm: "auto" }, // Full width on small screens
            }}
            onClick={() => navigate("/searchplayers")}
          >
            ค้นหานักศึกษาที่ลงแข่งขัน
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
