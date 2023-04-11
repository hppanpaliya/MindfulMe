import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./GuidedMeditation.css";
import audioFiles from "../../data/audioFiles";
import { getDisplayName } from "../../utils/helper";

const GuidedMeditation = () => {
  // Define state to track the current audio file
  const [currentAudio, setCurrentAudio] = useState(audioFiles[0]);

  // Handler function for when the user selects a new audio file
  const handleAudioChange = (event) => {
    setCurrentAudio(event.target.value);
  };

  return (
    <div className="guidedMeditation">
      <h1>Breathing Exercise</h1>
      <p>Follow the instructions to practice deep breathing:</p>
      <ol>
        <li>Inhale deeply through your nose for 4 seconds.</li>
        <li>Hold your breath for 4 seconds.</li>
        <li>Exhale slowly through your mouth for 4 seconds.</li>
        <li>Hold your breath for 4 seconds.</li>
        <li>Repeat this process for a few minutes.</li>
      </ol>
      {/* Visualization of breathing circles */}
      <div className="breathingContainer">
        <div className="breathingCircle circle1" />
        <div className="breathingCircle circle2" />
        <div className="breathingCircle circle3" />
        <div className="breathingCircle circle4" />
        <div className="breathingCircle circle5" />
      </div>
      {/* Dropdown menu for selecting background audio */}
      <label htmlFor="audioSelect">Select background audio:</label>
      <select id="audioSelect" value={currentAudio} onChange={handleAudioChange}>
        {audioFiles.map((file, index) => (
          <option key={index} value={file}>
            {/* Use a helper function to get a display name for the audio file */}
            {getDisplayName(file)}
          </option>
        ))}
      </select>
      {/* Audio player for the selected audio file */}
      <ReactAudioPlayer src={currentAudio} autoPlay controls loop />
    </div>
  );
};

export default GuidedMeditation;
