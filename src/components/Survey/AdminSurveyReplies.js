import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import questions from "./Questions.json";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";

const AdminSurveyReplies = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersSnapshot = await firebase
          .firestore()
          .collection("users")
          .get();
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(users);
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!selectedUser) {
        setSurveyData([]);
        return;
      }

      try {
        const surveysSnapshot = await firebase
          .firestore()
          .collection("users")
          .doc(selectedUser.id)
          .collection("surveys")
          .orderBy("timestamp", "desc")
          .get();

        const surveys = surveysSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSurveyData(surveys);
      } catch (error) {
        console.error("Error fetching survey data from Firestore:", error);
      }
    };

    fetchSurveyData();
  }, [selectedUser]);

  const getQuestionById = (id) => {
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].questions.length; j++) {
        if (questions[i].questions[j].id === id) {
          return questions[i].questions[j];
        }
      }
    }
    return null;
  };
  return (
    <Box
      sx={{
        margin: "2rem auto",
        maxWidth: "800px",
        padding: "2rem",
        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h1">All User Surveys</Typography>

      <Typography variant="h2" sx={{ mt: "40px" }}>
        Select a user:
      </Typography>
      <List sx={{ border: "1px solid gray", borderRadius: "5px", p: 0 }}>
        {userData.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton
              onClick={() => setSelectedUser(user)}
              sx={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText primary={user.username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {selectedUser && (
        <Box sx={{ mt: "40px" }}>
          <Typography variant="h2">
            Surveys for {selectedUser.username}:
          </Typography>

          {surveyData.length === 0 ? (
            <Typography>No surveys found.</Typography>
          ) : (
            <Box component="ul" sx={{ listStyle: "none", pl: 0, mt: "20px" }}>
              {surveyData.map((survey) => (
                <Box key={survey.id} component="li" sx={{ mt: "20px" }}>
                  <Typography variant="h6" sx={{ mb: "10px" }}>
                    Date: {new Date(survey.timestamp).toLocaleString()}
                  </Typography>

                  <Box component="ul" sx={{ listStyle: "none", pl: 0 }}>
                    {Object.entries(survey.answers).map(
                      ([questionId, answer]) => {
                        const question = getQuestionById(parseInt(questionId));
                        return (
                          question && (
                            <Box
                              key={questionId}
                              component="li"
                              sx={{ mt: "10px" }}
                            >
                              <Typography variant="h6" sx={{ mb: "5px" }}>
                                {questionId}. {question.question}
                              </Typography>

                              {question.type === "options" ? (
                                <Typography>{answer}</Typography>
                              ) : (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography>{answer}</Typography>
                                  {survey.imageUrls &&
                                    survey.imageUrls[questionId] && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mt: "10px",
                                        }}
                                      >
                                        <img
                                          src={survey.imageUrls[questionId]}
                                          alt={`uploaded for question ${questionId}`}
                                          width="100"
                                        />
                                      </Box>
                                    )}
                                </Box>
                              )}
                            </Box>
                          )
                        );
                      }
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdminSurveyReplies;
