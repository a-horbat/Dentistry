import React, { useState } from "react";
import { storage } from "firebase/app";
import {
  useUploadInvoicePhoto,
  useBooleanControls,
} from "@base86inc/apollo-client";
import CircularProgress from "@material-ui/core/CircularProgress";
import "firebase/storage";
import "firebase/auth";

export const UploadField = ({
  name = "",
  label = "",
  value = "",
  uploading = false,
  placeholder = "",
  onChange = (ev) => {},
  className = "",
  accept = "image/png,application/pdf",
  style = {},
}) => {
  const [isHover, hoverControls] = useBooleanControls(false);
  const [isDragover, dragoverControls] = useBooleanControls(false);
  return (
    <div className={className}>
      <label style={{ display: "block" }} htmlFor={`${name}-file`}>
        {label}
      </label>
      <div
        style={{
          borderRadius: 4,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #eee",
          borderColor: isDragover
            ? ""
            : isHover
            ? "#21C5C4"
            : "rgba(100, 100, 100, 0.23)",
          ...style,
        }}
      >
        {uploading ? (
          <CircularProgress />
        ) : value ? (
          <img
            src={value}
            alt={'Invoice'}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          placeholder
        )}
        <canvas
          id={`${name}-canvas`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            cursor: "pointer",
          }}
        />
        <input
          type="file"
          accept={accept}
          id={`${name}-file`}
          onMouseEnter={(ev) => hoverControls.setTrue()}
          onMouseLeave={(ev) => hoverControls.setFalse()}
          onTouchStart={(ev) => hoverControls.setTrue()}
          onTouchEnd={(ev) => hoverControls.setFalse()}
          onDragOver={(ev) => dragoverControls.setTrue()}
          onDragEnter={(ev) => dragoverControls.setTrue()}
          onDragLeave={(ev) => dragoverControls.setFalse()}
          onDragEnd={(ev) => dragoverControls.setFalse()}
          onDrop={(ev) => dragoverControls.setFalse()}
          onChange={onChange}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>
      <input name={name} hidden={true} value={value} readOnly={true} />
    </div>
  );
};
