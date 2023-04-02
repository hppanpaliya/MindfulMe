import React from "react";
import "./cbt.css";

const CBT = () => {
  return (
    <div className="cbt">
      <h1>Cognitive-behavioral therapy (CBT) Techniques and Resources</h1>
      <div className="cbt-section">
        <h2>Cognitive Techniques</h2>
        <p>
          Cognitive techniques focus on identifying and changing negative thought patterns that can contribute to negative emotions and behaviors. These techniques can help individuals challenge and change their negative thoughts, leading to improved mood and behavior.
        </p>
        <ul>
          <li><a href="https://www.getselfhelp.co.uk/docs/ThoughtRecordSheet7.pdf" target="_blank" rel="noopener noreferrer">Thought Record Sheet</a> - A worksheet that helps identify negative thoughts and reframe them in a more positive light.</li>
          <li><a href="https://positivepsychology.com/cognitive-distortions/" target="_blank" rel="noopener noreferrer">Cognitive Distortions</a> - A list of common negative thought patterns and how to challenge them.</li>
        </ul>
      </div>
      <div className="cbt-section">
        <h2>Behavioral Techniques</h2>
        <p>
          Behavioral techniques focus on changing negative behaviors that can contribute to negative emotions and thoughts. These techniques can help individuals learn new, healthier behaviors that promote positive emotions and thoughts.
        </p>
        <ul>
          <li><a href="https://www.verywellmind.com/what-is-systematic-desensitization-2795459" target="_blank" rel="noopener noreferrer">Systematic Desensitization</a> - A technique used to overcome phobias and anxiety by gradually exposing oneself to the feared situation.</li>
        </ul>
      </div>
      <div className="cbt-section">
        <h2>Resources</h2>
        <p>
          Here are some additional resources for learning more about CBT:
        </p>
        <ul>
          <li><a href="https://www.nhs.uk/conditions/cognitive-behavioural-therapy-cbt/" target="_blank" rel="noopener noreferrer">NHS - Cognitive Behavioural Therapy (CBT)</a> - Information on CBT from the UK's National Health Service.</li>
          <li><a href="https://www.beckinstitute.org/" target="_blank" rel="noopener noreferrer">Beck Institute for Cognitive Behavior Therapy</a> - A research and training organization that provides resources on CBT.</li>
          <li><a href="https://positivepsychology.com/cbt-cognitive-behavioral-therapy-techniques-worksheets/" target="_blank" rel="noopener noreferrer">Positive Psychology - CBT Techniques and Worksheets</a> - A collection of CBT worksheets and techniques from Positive Psychology.</li>
          <li><a href="https://www.excelatlife.com/cbt.htm" target="_blank" rel="noopener noreferrer">Excel at Life - CBT</a> - A collection of CBT worksheets and techniques from Excel at Life.</li>
        </ul>
      </div>
    </div>
  );
};

export default CBT;
