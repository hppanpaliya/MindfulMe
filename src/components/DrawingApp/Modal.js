import React, { useRef } from "react";

const Modal = ({ children, onClose }) => {
  const innerDivRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!innerDivRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleInnerDivClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClickOutside}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
    >
      <div
        ref={innerDivRef}
        onClick={handleInnerDivClick}
        style={{
          position: "relative",
          padding: "2rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
