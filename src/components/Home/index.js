import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import slideImages from "./slideImages.json";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        color: "#ffffff",
        padding: 4,
        backgroundColor: darkMode ? "#000000" : "#f8f8f8",
      }}
    >
      <Container maxWidth="lg">
        <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 1 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }} mt={2}>
            Welcome to MindfulMe: Your Companion for Mental Well-being!
          </Typography>
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "medium" }} mt={2}>
            The app is divided into the following categories:
          </Typography>
        </motion.div>
        <Grid container spacing={4} mt={2} style={{ display: "flex", alignItems: "stretch" }}>
          {slideImages.map((slide, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.5, delay: index * 0.2 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
                    boxShadow: 1,
                    borderRadius: 2,
                    maxWidth: 500,
                    margin: "auto",
                    minHeight: 230,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, height: "100%" }}>
                    <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
                      {slide.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 3 }} align="center">
                      {slide.description}
                    </Typography>
                    {slide.items && (
                      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {slide.items.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: 8 }}>
                            {slide.links && slide.links[idx] ? (
                              <Link
                                to={slide.links[idx]}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  align="center"
                                  sx={{
                                    fontWeight: "medium",
                                    "&:hover": {
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                    },
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Link>
                            ) : (
                              <Typography variant="body1" align="center" sx={{ fontWeight: "medium" }}>
                                {item}
                              </Typography>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
                                  