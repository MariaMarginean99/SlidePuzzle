/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
export default function Modal({ open, message }) {
  return (
    <Dialog
      open={open}
      style={{
        textAlign: "center",
      }}
    >
      <div style={{ height: 500, width: 500, marginTop: 50 }}>
        {message.map((text) => (
          <DialogTitle style={{ fontSize: 30 }}>{text}</DialogTitle>
        ))}
      </div>
    </Dialog>
  );
}
