import * as fp from "fingerpose";

const pointDownGesture = new fp.GestureDescription("point_down");

// Thumb
pointDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

// Index
pointDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.9);
pointDownGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalDown,
  1.0
);

// Middle, ring, pinky
for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pointDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  pointDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  pointDownGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
  pointDownGesture.addDirection(
    finger,
    fp.FingerDirection.DiagonalDownRight,
    0.9
  );
}

export default pointDownGesture;
