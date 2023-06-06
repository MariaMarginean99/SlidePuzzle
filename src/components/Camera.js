import React from "react";
import Webcam from "react-webcam";

export default function Camera(props) {
  return (
    <>
      <Webcam
        ref={props.webcamRef}
        style={{
          marginLeft: 20,
          marginTop: 20,
          width: 200,
          height: 200,
        }}
      />

      <canvas
        ref={props.canvasRef}
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          width: 200,
          height: 200,
        }}
      />
      {props.emoji !== null ? (
        <img
          src={props.images[props.emoji]}
          style={{
            position: "absolute",
            left: 20,
            top: 15,
            height: 30,
          }}
          alt="Img"
        />
      ) : (
        ""
      )}
    </>
  );
}
