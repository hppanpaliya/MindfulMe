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

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        background:
          "linear-gradient(to bottom, #009688, #55c2c2 10%, #BBBBBB 100%)",
        color: "#ffffff",
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to our Mental Health Support Web App!
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            The app is divided into the following categories:
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {slideImages.map((slide, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" align="center">
                      {slide.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ marginTop: 1 }}
                      align="center"
                    >
                      {slide.description}
                    </Typography>
                    {slide.items && (
                      <ul>
                        {slide.items.map((item, idx) => (
                          <li key={idx}>
                            {slide.links && slide.links[idx] ? (
                              <Link
                                to={slide.links[idx]}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <Typography variant="body1" align="center">
                                  {item}
                                </Typography>
                              </Link>
                            ) : (
                              <Typography variant="body1" align="center">
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
