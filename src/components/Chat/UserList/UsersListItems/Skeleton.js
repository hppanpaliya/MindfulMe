import React from "react";
import { Box, Skeleton } from "@mui/material";
const UsersListSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", padding: "8px", borderBottom: "1px solid #eee" }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ mr: "16px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
            <Skeleton variant="text" width={100} height={30} sx={{ mb: "4px" }} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
          <Skeleton variant="text" width={100} height={20} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", padding: "8px", borderBottom: "1px solid #eee" }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ mr: "16px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
            <Skeleton variant="text" width={100} height={30} sx={{ mb: "4px" }} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
          <Skeleton variant="text" width={100} height={20} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", padding: "8px", borderBottom: "1px solid #eee" }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ mr: "16px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
            <Skeleton variant="text" width={100} height={30} sx={{ mb: "4px" }} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
          <Skeleton variant="text" width={100} height={20} />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersListSkeleton;
