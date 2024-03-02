import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const TypeWriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex <= text.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return (
    <Typography
      variant="h2"
      align="center"
      sx={{
        maxWidth: "600px",
        marginBottom: "10%",
      }}
    >
      {currentText}
    </Typography>
  );
};

export default TypeWriter;
