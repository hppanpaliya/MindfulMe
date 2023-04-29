import React, { useState, useEffect } from "react";
import "./GuidedMeditation.css";
import audioFiles from "../../data/audioFiles";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Sound from "react-sound";
import { Button, Typography } from "@mui/material";
//play Icon and pause icon
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { getDisplayName as formatDisplayName } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const GuidedMeditation = () => {
    // Define state to track the current audio file
    const [currentAudio, setCurrentAudio] = useState(audioFiles[0]);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(Sound.status.STOPPED);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [key, setKey] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePlayPause = () => {
        setIsPlaying(
            isPlaying === Sound.status.PLAYING
                ? Sound.status.PAUSED
                : Sound.status.PLAYING
        );
    };

    const handleAudioEnd = () => {
        console.log("end");
        setProgress(0);
        handlePlayPause();
    };

    const handleAudioStart = () => {
        console.log("start");
    };

    const handleProgress = (value) => {
        setPosition(value.position);
        setDuration(value.duration);

        // console.log(Math.floor((position / 1000)))
        // console.log(Math.floor((duration / 1000)))

        let currentProgress = (value.position / value.duration) * 100;
        setProgress(currentProgress);
    };

    return (
      <AnimatePresence mode="wait">
        <div className="guided-meditation-page">
          <motion.div
            className="guidedMeditation"
            style={{
              backgroundImage: `url(${currentAudio.backgroundImage})`,
            }}
            key={key}
            animate={{
              backgroundPosition: ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
            }}
            transition={{
              duration: 1000,
              loop: Infinity,
              ease: "ease-in-out",
            }}
          >
            <div className="guidedMeditation__header">
              <Typography variant="h4" fontWeight="bold" align="center" color="black">
                Guided Meditation
              </Typography>

              <Select
                labelId="customized-menu"
                value={selectedOption}
                onChange={(e) => {
                  setCurrentAudio(audioFiles[e.target.value]);
                  setSelectedOption(e.target.value);
                }}
                onMouseEnter={handleMenuOpen}
                onMouseOut={handleMenuClose}
                MenuProps={{
                  onMouseLeave: handleMenuClose,
                }}
                sx={{ width: 300, mt: 2, color: "black" }}
              >
                {audioFiles.map((audio, index) => (
                  <MenuItem key={audio.url} value={index}>
                    {formatDisplayName(audio.url)}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="guidedMeditation_audio">
              <Sound
                url={currentAudio.url}
                playStatus={isPlaying}
                onFinishedPlaying={handleAudioEnd}
                onLoading={handleAudioStart}
                onPlaying={handleProgress}
                onSeek={handleProgress}
                listenInterval={1000}
                volume={100}
                loop={false}
                autoLoad={true}
                muted={false}
              />

              <div className="guidedMeditation_audio__progress">
                <CircularProgressbarWithChildren
                  value={position}
                  text={``}
                  strokeWidth={20}
                  maxValue={duration || 100}
                  styles={{
                    path: {
                      transition: "stroke-dashoffset 1s ease 0s",
                      stroke: "#009083",
                      strokeWidth: 5,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    },
                    trail: {
                      stroke: "#ddd",
                      strokeWidth: 5,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    },
                    text: {
                      fontSize: "1.3rem",
                      dominantBaseline: "central",
                      textAnchor: "middle",
                    },
                  }}
                >
                  <Button onClick={handlePlayPause}>
                    {isPlaying === Sound.status.PLAYING ? (
                      <PauseIcon
                        style={{
                          fontSize: "5rem",
                        }}
                      />
                    ) : (
                      <PlayIcon
                        style={{
                          fontSize: "5rem",
                        }}
                      />
                    )}
                  </Button>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
};

export default GuidedMeditation;
