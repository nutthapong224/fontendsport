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
import playerfutsal from "../assets/fulsal.jpg";
import playerbasketball from "../assets/basketball.jpg";
import playervolleyball from "../assets/volleyball.jpg";
import playertabletenis from "../assets/tabletenis.jpg";
import playerpetanque from "../assets/petanque.jpg";
import playerbadminton from "../assets/badminton.jpg";
import playertakraw from "../assets/takraw.jpg";
import hooptakraw from "../assets/hooptakraw.jpg";
import esport from "../assets/esport.jpg";

const Createplayer = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileView = useMediaQuery("(max-width:450px)"); // Detect mobile view size

  const items = [
    { label: "ฟุตบอล", path: "/football", icon: playerfootball },
    { label: "ฟุตซอล", path: "/fulsalpage", icon: playerfutsal },
    { label: "บาสเก็ตบอล", path: "/basketballpage", icon: playerbasketball },
    { label: "วอลเลย์บอล", path: "/volleyballpage", icon: playervolleyball },
    { label: "เทเบิลเทนิส", path: "/tabletenispage", icon: playertabletenis },
    { label: "เปตอง", path: "/petanquepage", icon: playerpetanque },
    { label: "แบตมินตัน", path: "/badmintonpage", icon: playerbadminton },
    { label: "เซปักตะกร้อ", path: "/takrawpage", icon: playertakraw },
    { label: "ตะกร้อลอดห่วง", path: "/hooptakraw", icon: hooptakraw },
    { label: "Esport", path: "/esport", icon: esport },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Typography
        variant={isMobileView ? "h5" : "h4"} // Adjust font size for mobile
        gutterBottom
      >
        เลือกประเภทกีฬาที่แข่ง
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

export default Createplayer;
