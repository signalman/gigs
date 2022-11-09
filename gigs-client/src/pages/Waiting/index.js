import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const Waiting = () => {
  const location = useLocation();

  console.log(location);

  return (
    <Box>
      기다려주세요
    </Box>
  )
};

export default Waiting;