import React, { useRef, useState, useEffect } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import fileSize from "@/utils/FileSize";

import "./DndInput.css";
import uploadImg from "@/assets/cloud-upload-regular-240.png";

const DndInput = (props) => {
  const wrapperRef = useRef(null);
  const [filesList, setFilesList] = useState([]);
  const [totalSize, setTotalSize] = useState("0 Bytes");
  const [animatedParent, enableAnimations] = useAutoAnimate();

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length !== 0) {
      const updatedList = [...filesList, ...newFiles];
      setFilesList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...filesList];
    updatedList.splice(filesList.indexOf(file), 1);
    setFilesList(updatedList);
    props.onFileChange(updatedList);
  };

  const upload = () => {
    props.onUpload();
  };

  const resetList = () => {
    setFilesList([]);
    props.onFileChange(updatedList);
  };

  useEffect(() => {
    enableAnimations(true);
  }, []);

  // Calculate Size on File Change
  useEffect(() => {
    const size = filesList.reduce((total, current) => total + current.size, 0);
    setTotalSize(fileSize(size));
  }, [filesList]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} multiple />
      </div>
      <div className="drop-file-preview">
        <div>
          <button
            className="drop-file-preview__upload"
            disabled={filesList.length < 1}
            onClick={upload}
          >
            Upload
          </button>
          <button onClick={resetList} className="drop-file-preview__clear">Clear</button>
        </div>
        <p className="drop-file-preview__size">Total Size: {totalSize}</p>
      </div>
      <div ref={animatedParent}>
        {filesList.map((item, index) => {
          const type = item.name.slice(
            item.name.lastIndexOf(".") + 1,
            item.name.length
          );
          return (
            <div key={index} className="drop-file-preview__item">
              <div className="drop-file-preview__item__icon">
                <FileIcon extension={type} {...defaultStyles[type]} />
              </div>
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{fileSize(item.size)}</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DndInput;
