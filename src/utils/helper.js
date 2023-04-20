import background1 from "../assets/images/backgrounds/background1.jpg";
import background2 from "../assets/images/backgrounds/background2.jpg";
import background3 from "../assets/images/backgrounds/background3.jpg";
import background4 from "../assets/images/backgrounds/background4.jpg";
import background5 from "../assets/images/backgrounds/background5.jpg";
import background6 from "../assets/images/backgrounds/background6.jpg";
import background7 from "../assets/images/backgrounds/background7.jpg";

export const getDisplayName = (file) => {
  return file
    .split("/")
    .pop()
    .replace(".mp3", "")
    .replace(/_/g, " ")
    .replace(/\.\w+$/, "");
};

export const getBackgroundImage = (audioFile) => {
  const backgroundImageMap = {
    1: `url(${background1})`,
    2: `url(${background2})`,
    3: `url(${background3})`,
    4: `url(${background4})`,
    5: `url(${background5})`,
    6: `url(${background6})`,
    7: `url(${background7})`,
  };
  console.log(backgroundImageMap[audioFile]);

  return backgroundImageMap[audioFile] || `url(${background1})`;
};
