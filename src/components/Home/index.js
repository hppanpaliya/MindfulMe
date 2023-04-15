import React, { useRef } from "react";
import { Typography, Box, Container, Grid, Card, CardContent } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import slideImages from "./slideImages.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blueBackground from "../../assets/images/blue-gradient-background.jpg";
import { useParams } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideRefs = useRef([]);

  const { slide } = useParams();
  console.log(slide);

  const handleScroll = () => {
    slideRefs.current.forEach((ref, index) => {
      const slideHeight = ref.getBoundingClientRect().height;
      const slideTop = ref.getBoundingClientRect().top;
      const slideBottom = slideTop + slideHeight;

      if (slideTop < window.innerHeight * 0.7 && slideBottom > window.innerHeight * 0.7) {
        const tag = ref.dataset.tag;
        const slideIndex = slideImages.findIndex((slide) => slide.tag === tag);
        console.log("scrolling", index);
        setCurrentSlide(index + 1);

        if (slide) {
          window.history.replaceState(null, "", `/`); 
        }
      }
    });
  };

  const scrollToSlide = (index) => {
    slideRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slideImages.length);

    window.addEventListener("scroll", handleScroll);
    if (slide) scrollToSlide(slide);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slide]);

  return (
    <Box>
      <Box>


        {slideImages.map((slide, index) => (
          <Box
            key={index}
            data-tag={slide.tag}
            ref={(el) => (slideRefs.current[index] = el)}
            sx={{ position: "relative", height: "100vh", overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide - 1 === index ? 1 : 0.5 }}
              transition={{ duration: 1.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${blueBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box sx={{ position: "absolute", top: "50%", left: 0, width: "100%", padding: 2, transform: "translateY(-50%)" }}>
              <Card sx={{ backgroundColor: "rgba(255,255,255,0.75)" }}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {slide.title}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }} align="center">
                    {slide.description}
                  </Typography>

                  {slide.items && (
                    <ul>
                      {slide.items.map((item, idx) => (
                        <li key={idx}>
                          {slide.links && slide.links[idx] ? (
                            <Link to={slide.links[idx]}>
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
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
