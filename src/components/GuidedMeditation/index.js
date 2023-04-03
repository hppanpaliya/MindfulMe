import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./GuidedMeditation.css";
import calmMeditationMusic from "../../assets/audio/Calm_Meditation_Music.mp3";
import gentleWaterSounds from "../../assets/audio/Gentle_Water_Sounds.mp3";
import muladharaRootChakra from "../../assets/audio/Muladhara_Root_Chakra_Skyful_of_Dreams.mp3";
import natureSoundsBirdsong from "../../assets/audio/Nature_Sounds_Birdsong_River_Sounds.mp3";
import peacefulMusicForMeditation from "../../assets/audio/Peaceful_Music_for_Meditation.mp3";
import tibetanBowls from "../../assets/audio/Tibetan_Bowls.mp3";
import vishuddhaThroatChakra from "../../assets/audio/Vishuddha_Throat_Chakra_Chakra_Meditation_Music.mp3";

const audioFiles = [
  calmMeditationMusic,
  gentleWaterSounds,
  muladharaRootChakra,
  natureSoundsBirdsong,
  peacefulMusicForMeditation,
  tibetanBowls,
  vishuddhaThroatChakra,
];

const getDisplayName = (file) => {
  return file
    .split("/")
    .pop()
    .replace(".mp3", "")
    .replace(/_/g, " ")
    .replace(/\.\w+$/, "");
};

const GuidedMeditation = () => {
  const [currentAudio, setCurrentAudio] = useState(audioFiles[0]);

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
      <div className="breathingContainer">
        <div className="breathingCircle circle1" />
        <div className="breathingCircle circle2" />
        <div className="breathingCircle circle3" />
        <div className="breathingCircle circle4" />
        <div className="breathingCircle circle5" />
        <div className="breathingCircle circle6" />
        <div className="breathingCircle circle7" />
        <div className="breathingCircle circle8" />
      </div>
      <label htmlFor="audioSelect">Select background audio:</label>
      <select id="audioSelect" value={currentAudio} onChange={handleAudioChange}>
        {audioFiles.map((file, index) => (
          <option key={index} value={file}>
            {getDisplayName(file)}
          </option>
        ))}
      </select>
      <ReactAudioPlayer src={currentAudio} autoPlay controls loop />
    </div>
  );
};

export default GuidedMeditation;
