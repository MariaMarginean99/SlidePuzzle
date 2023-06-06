import * as fp from 'fingerpose';

const pointRightGesture = new fp.GestureDescription('point_right');

// THUMB
pointRightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
pointRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);
pointRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.9);

// OTHER FINGERS
for (const finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pointRightGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  // pointRightGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
  pointRightGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default pointRightGesture;
