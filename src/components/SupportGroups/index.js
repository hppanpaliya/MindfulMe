import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "../../store/features/supportGroups/supportGroupsSlice";
import GroupsList from "./groupsList";
import Chats from "./chats";
import CreateGroup from "./createGroup";
import { Container, Grid, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SupportGroups = () => {
  // Define state variable for the selected group
    const [selectedGroup, setSelectedGroup] = useState(null);
    const theme = useTheme();
    let isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get the groups array from the Redux store
  const groups = useSelector(selectGroups);

  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // Fetch the groups from the server when the component mounts
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // Handle selection of a group from the list
  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
  };

  // Handle going back to the group list
  const handleBack = () => {
    setSelectedGroup(null);
  };

  const chatAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container
      sx={{
        display: "flex",
        margin: 0,
        minWidth: "100%",
        height: `calc(${window.innerHeight} - 64px)`, // 100vh - 64px --
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <AnimatePresence>
            <motion.div
              key={selectedGroup}
              initial={isMobile ? "hidden" : false}
              animate="visible"
              exit={isMobile ? "exit" : false}
              variants={chatAnimation}
            >
              <Box
                sx={{
                  display: { xs: selectedGroup ? "none" : "block", sm: "block" },
                  borderRight: 1,
                  borderColor: "lightgray",
                  height: "100%",
                }}
              >
                <CreateGroup style={{ position: "fixed", top: 0, left: 0 }} />
                <Box
                  sx={{
                    maxHeight: `calc(${window.innerHeight} - 174px)`, // 100vh - 64px - 50px - 60px
                    overflowY: "auto",
                  }}
                >
                  <GroupsList groups={groups} handleSelectGroup={handleSelectGroup} selectedGroup={selectedGroup} />
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <AnimatePresence>
              {selectedGroup && (
                <motion.div key={selectedGroup} initial="hidden" animate="visible" exit="exit" variants={chatAnimation}>
                  <IconButton
                    sx={{
                      display: { xs: "block", sm: "none" },
                      position: "absolute",
                      top: 50,
                      left: 0,
                    }}
                    onClick={handleBack}
                  >
                    <ArrowBackIcon sx={{ color: "black" }} fontSize="large" />
                  </IconButton>
                  <Chats groupId={selectedGroup} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SupportGroups;
