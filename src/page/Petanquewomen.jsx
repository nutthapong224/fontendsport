import React from "react";
import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import playerfootball from "../assets/football.jpg";

import playersingle from "../assets/singlemen.png";
import playerdoublemen from "../assets/doublemen.png";


const Petanquewomen = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileView = useMediaQuery("(max-width:450px)"); // Detect mobile view size

  const items = [
  
    { label: "เปตองหญิงเดี่ยว", path: "/petanquesinglewomen", icon: playersingle },
    { label: "เปตองหญิงคู่", path: "/petanquedoublewomen", icon: playerdoublemen }
   
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Typography
        variant={isMobileView ? "h5" : "h4"} // Adjust font size for mobile
        gutterBottom
      >
        เลือกประเภทการแข่งขัน
      </Typography>

      <ImageList
        cols={isSmallScreen ? 1 : 2}
        gap={20}
        sx={{ maxWidth: 600, margin: "auto" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer", textAlign: "center" }} // Center text
          >
            <Typography
              variant={isMobileView ? "body1" : "h6"} // Adjust font size for mobile
              sx={{ marginBottom: "10px" }}
            >
              {item.label}
            </Typography>
            <ImageListItem>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Center the image
                }}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    borderRadius: "10px",
                    width: isMobileView ? "150px" : "150px", // Adjust width for mobile
                    height: isMobileView ? "150px" : "150px", // Adjust height for mobile
                  }}
                />
              </div>
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </div>
  );
};

export default Petanquewomen;
