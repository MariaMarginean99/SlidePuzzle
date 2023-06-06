import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { drawHand } from "./utilities";

// import gesture
import okGesture from "./gestures/OK";
import pointUpGesture from "./gestures/PointUp";
import pointDownGesture from "./gestures/PointDown";
import pointRightGesture from "./gestures/PointRight";
import pointLeftGesture from "./gestures/PointLeft";
import raisedHandGesture from "./gestures/RaisedHand";
import victoryGesture from "./gestures/Victory";

// import images
import ok from "./asserts/ok.png";
import openHand from "./asserts/openHand.png";
import up from "./asserts/up.png";
import down from "./asserts/down.png";
import victory from "./asserts/victory.png";
import right from "./asserts/right.png";
import left from "./asserts/left.png";
import Puzzle from "./components/Puzzle";
import Camera from "./components/Camera";
import Modal from "./components/Modal";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState([]);

  const images = {
    ok: ok,
    point_up: up,
    point_down: down,
    point_right: right,
    point_left: left,
    raised_hand: openHand,
    victory: victory,
  };

  useEffect(() => {
    runHandpose();
  }, []);

  /**
   *
   */
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 3000);
  };

  /**
   *
   * @param {*} net
   */
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          pointUpGesture,
          pointDownGesture,
          pointRightGesture,
          pointLeftGesture,
          okGesture,
          raisedHandGesture,
          victoryGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setEmoji(gesture.gestures[maxConfidence].name);
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  /**
   *
   * @param {*} value
   */
  function handleChangeIsPaused(value) {
    setIsPaused(value);
  }

  function handleChangeMessage(value) {
    setMessage(value);
  }
  return (
    <div className="App">
      <Camera
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        emoji={emoji}
        images={images}
      />
      <Puzzle
        emoji={emoji}
        isPaused={isPaused}
        message={message}
        handleChangeIsPaused={handleChangeIsPaused}
        handleChangeMessage={handleChangeMessage}
      />
      <Modal open={isPaused} message={message} />
    </div>
  );
}

export default App;
