import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box height="10%" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default">
      <Typography variant="h4">Therapy Chatbot</Typography>
    </Box>
  );
}

export default Header;
