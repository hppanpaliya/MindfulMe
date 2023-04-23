import React from "react";
import "./cbt.css";
import { Typography } from "@mui/material";

const CBT = () => {
    return (
        <div className="cbt">
            <Typography variant="h4" fontWeight="bold" align="center">
                Cognitive-behavioral therapy (CBT) Techniques and Resources
            </Typography>
            <div className="cbt-section">
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                    Cognitive Techniques
                </Typography>
                <Typography variant="body1">
                    Cognitive techniques focus on identifying and changing
                    negative thought patterns that can contribute to negative
                    emotions and behaviors. These techniques can help
                    individuals challenge and change their negative thoughts,
                    leading to improved mood and behavior.
                </Typography>
                <ul>
                    <li>
                        <a
                            href="https://www.getselfhelp.co.uk/docs/ThoughtRecordSheet7.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Thought Record Sheet
                        </a>{" "}
                        - A worksheet that helps identify negative thoughts and
                        reframe them in a more positive light.
                    </li>
                    <li>
                        <a
                            href="https://positivepsychology.com/cognitive-distortions/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Cognitive Distortions
                        </a>{" "}
                        - A list of common negative thought patterns and how to
                        challenge them.
                    </li>
                </ul>
            </div>
            <div className="cbt-section">
                <Typography variant="h5" fontWeight="bold">
                    Behavioral Techniques
                </Typography>
                <Typography variant="body1">
                    Behavioral techniques focus on changing negative behaviors
                    that can contribute to negative emotions and thoughts. These
                    techniques can help individuals learn new, healthier
                    behaviors that promote positive emotions and thoughts.
                </Typography>
                <ul>
                    <li>
                        <a
                            href="https://www.verywellmind.com/what-is-systematic-desensitization-2795459"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Systematic Desensitization
                        </a>{" "}
                        - A technique used to overcome phobias and anxiety by
                        gradually exposing oneself to the feared situation.
                    </li>
                </ul>
            </div>
            <div className="cbt-section">
                <Typography variant="h5" fontWeight="bold">
                    Resources
                </Typography>
                <Typography variant="body1">
                    Here are some additional resources for learning more about
                    CBT:
                </Typography>
                <ul>
                    <li>
                        <a
                            href="https://www.nhs.uk/conditions/cognitive-behavioural-therapy-cbt/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            NHS - Cognitive Behavioural Therapy (CBT)
                        </a>{" "}
                        - Information on CBT from the UK's National Health
                        Service.
                    </li>
                    <li>
                        <a
                            href="https://www.beckinstitute.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Beck Institute for Cognitive Behavior Therapy
                        </a>{" "}
                        - A research and training organization that provides
                        resources on CBT.
                    </li>
                    <li>
                        <a
                            href="https://positivepsychology.com/cbt-cognitive-behavioral-therapy-techniques-worksheets/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Positive Psychology - CBT Techniques and Worksheets
                        </a>{" "}
                        - A collection of CBT worksheets and techniques from
                        Positive Psychology.
                    </li>
                    <li>
                        <a
                            href="https://www.excelatlife.com/cbt.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Excel at Life - CBT
                        </a>{" "}
                        - A collection of CBT worksheets and techniques from
                        Excel at Life.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CBT;






// import React, { useEffect } from 'react';
// import { Grid } from '@mui/material';

// const CBT = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://widget.rss.app/v1/wall.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <div id="95hSzCOkXELqfmQn">
//           <rssapp-wall id="95hSzCOkXELqfmQn"></rssapp-wall>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default CBT;
