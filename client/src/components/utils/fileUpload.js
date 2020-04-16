import React, { useState } from "react";
import DropZone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";
import { set } from "mongoose";
const FileUpload = props => {
  const [Images, setImages] = useState([]);
  const onDrop = files => {
    let formData = new FormData();
    formData.append("file", files[0]);
    Axios.post("/api/products/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      if (res.data.success) {
        setImages([...Images, res.data.image]);
        props.refreshFunction([...Images, res.data.image]);
      } else {
        alert("failed to save the image on server");
      }
    });
  };
  const deleteImage = (image) => {
      const currentIndex = Images.indexOf(image);
      let newImages = [...Images];
      newImages.splice(currentIndex,1);
      setImages(newImages);
      props.refreshFunction(newImages);
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DropZone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </DropZone>
      <div
      style={{
        width: "350px",
        height: "240px",
        overflowX: "scroll",
        display: "flex",
      }}
      >
          {
              Images.map((image,ind)=>(
                <div onClick={()=>deleteImage(image)}>
                    <img 
                    key={ind}
                    src={`http://localhost:5000/${image}`} 
                    alt={`productImage-${ind}`} 
                    style={{   
                    width: "350px",
                    height: "240px",
                    minWidth:"350px",
                }}
                    />
                </div>
              ))
          }
      </div>
    </div>
  );
};

export default FileUpload;
