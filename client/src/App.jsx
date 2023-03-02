import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DndInput from "@/components/DndInput/DndInput";
import Apis from "@/config/apiUrls";
import fileSize from "@/utils/FileSize";
import "./App.css";

function App() {
  const [files, setFiles] = useState(null);
  const [status, setStatus] = useState({
    uploading: false,
    progress: null,
    error: false,
    success: false,
  });

  const onSubmit = async () => {
    setStatus((prev) => ({ ...prev, uploading: true }));
    try {
      const form = new FormData();
      let size = 0;
      files.forEach((file) => {
        size += file.size;
        form.append("files", file);
      });
      form.append("totalSize", fileSize(size));
      form.append("numberOfFiles", files.length);

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          if (percentage === 100) {
            setStatus((prev) => ({ ...prev, uploading: false }));
          }
          setStatus((prev) => ({ ...prev, progress: percentage.toFixed(2) }));
        },
        headers: { "Content-Type": "multipart/form-data" },
      };
      const res = await axios.post(Apis.files.save, form, config);
      console.log(res);
      toast.success("Files uploaded");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="uploader">
      <div className="uploader-container">
        {status.uploading ? (
          <div className="progress-container">
            <p className="progress-counter">{status.progress}%</p>
            <div
              className="progress-bar"
              style={{ width: 4 * status.progress }}
            ></div>
          </div>
        ) : null}
        <DndInput
          onFileChange={(files) => setFiles(files)}
          onUpload={onSubmit}
        />
      </div>
    </div>
  );
}

export default App;
