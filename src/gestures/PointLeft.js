import * as fp from 'fingerpose';

const pointLeftGesture = new fp.GestureDescription('point_left');

// THUMB
pointLeftGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
pointLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
pointLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.9);

// OTHER FINGERS
for (const finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pointLeftGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
//   pointLeftGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
  pointLeftGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default pointLeftGesture;
