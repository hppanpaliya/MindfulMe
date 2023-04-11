export const getDisplayName = (file) => {
    return file
      .split("/")
      .pop()
      .replace(".mp3", "")
      .replace(/_/g, " ")
      .replace(/\.\w+$/, "");
  };
  