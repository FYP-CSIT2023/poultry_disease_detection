import React from "react";
import Navbar from "./Navbar";
import UploadButton from "./upload";
const Home = () => {
  
  const handleUpload = (file) => {
    console.log('Uploading file:', file);}

  return (
    <div className="home-container">
      <Navbar />
      <UploadButton buttonText="Upload Image" onUpload={handleUpload} />
    </div>
   
  );
};

export default Home;