import React, { useState } from "react";
import firebase from "../../utils/firebase";
import surveyQuestions from "./Questions.json";
import { styled } from "@mui/material/styles";
import {
    Radio,
    FormControlLabel,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
} from "@mui/material";

const HciSurvey = styled("div")(({ theme }) => ({
    margin: "2rem auto",
    maxWidth: "600px",
    padding: "2rem",
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    "& h1, h2": {
        textAlign: "center",
        marginBottom: "2rem",
    },
    "& label": {
        fontWeight: "bold",
        display: "block",
        marginBottom: "0.5rem",
    },
    "& input[type='text']": {
        marginBottom: "1rem",
    },
    "& input[type='file']": {
        display: "block",
        marginBottom: "1rem",
    },
}));

const Survey = () => {
    const [imageFiles, setImageFiles] = useState({});
    const [answers, setAnswers] = useState({});

    const handleImageUpload = async (questionId, file) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(
            `survey-images/${questionId}/${file.name}`
        );
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        return url;
    };

    const handleImageChange = (event, questionId) => {
        const file = event.target.files[0];
        setImageFiles({ ...imageFiles, [questionId]: file });
    };

    const handleChange = (event, questionId) => {
        setAnswers({ ...answers, [questionId]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Upload images and get their URLs
        const imageUrls = await Promise.all(
            Object.entries(imageFiles).map(async ([questionId, file]) => {
                const url = await handleImageUpload(questionId, file);
                return { questionId, url };
            })
        ).then((urls) => {
            return urls.reduce((acc, { questionId, url }) => {
                acc[questionId] = url;
                return acc;
            }, {});
        });

        const surveyData = {
            answers,
            imageUrls,
            timestamp: Date.now(),
        };

        try {
            const user = firebase.auth().currentUser;
            await firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .collection("surveys")
                .add(surveyData);
            console.log("Survey data saved to Firestore.");
        } catch (error) {
            console.error("Error saving survey data to Firestore:", error);
        }
    };
    return (
        <HciSurvey>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    HCI Survey
                </Typography>

                <Box sx={{ width: "100%", maxWidth: "800px" }}>
                    <form onSubmit={handleSubmit}>
                        {surveyQuestions.map((page) => (
                            <Box key={page.page} sx={{ mt: "40px" }}>
                                <Typography variant="h4" sx={{ mb: "20px" }}>
                                    {page.page}
                                </Typography>
                                {page.questions.map((question) => (
                                    <Box key={question.id} sx={{ mb: "20px" }}>
                                        <Typography variant="h6">
                                            {question.question}
                                        </Typography>

                                        {question.type === "options" ? (
                                            <Stack
                                                direction="column"
                                                sx={{ mt: "10px" }}
                                            >
                                                {question.options.map(
                                                    (option, index) => (
                                                        <FormControlLabel
                                                            key={index}
                                                            value={option}
                                                            control={
                                                                <Radio
                                                                    name={
                                                                        question.id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleChange(
                                                                            e,
                                                                            question.id
                                                                        )
                                                                    }
                                                                    checked={
                                                                        answers[
                                                                            question
                                                                                .id
                                                                        ] ===
                                                                        option
                                                                    }
                                                                />
                                                            }
                                                            label={option}
                                                        />
                                                    )
                                                )}
                                            </Stack>
                                        ) : (
                                            <TextField
                                                onChange={(e) =>
                                                    handleChange(e, question.id)
                                                }
                                                sx={{
                                                    mt: "10px",
                                                    width: "100%",
                                                }}
                                            />
                                        )}

                                        {question.image && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    mt: "10px",
                                                }}
                                            >
                                                <label
                                                    htmlFor={`image-upload-${question.id}`}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        sx={{ mr: "10px" }}
                                                    >
                                                        Upload an image
                                                    </Button>
                                                </label>
                                                <Typography>
                                                    {imageFiles[question.id]
                                                        ?.name ?? ""}
                                                </Typography>
                                                <input
                                                    type="file"
                                                    id={`image-upload-${question.id}`}
                                                    style={{ display: "none" }}
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            e,
                                                            question.id
                                                        )
                                                    }
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: "40px" }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </HciSurvey>
    );
};

export default Survey;
