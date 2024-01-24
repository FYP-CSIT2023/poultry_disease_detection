import React, { useState } from 'react';

const UploadButton = ({ buttonText, icon, onUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => { 
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedImage(URL.createObjectURL(file));
        onUpload(file);
      } else {
        alert('Please choose a valid image file.');
      }
    }
  };

  const handleButtonClick = () => {
    // Add your logic for the button click action here
    console.log('Button Clicked!');
  };

  const styles = {
      UploadButtonContainer : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        height: '50%',
        },
    
      label: {
        cursor: 'pointer',
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
    
      labelImg: {
        maxWidth: '50px',
        marginBottom: '10px',
      },
    
      uploadedImageContainer: {
        display :'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        textAlign: 'center',
      },
      
      uploadedImage: {
        maxWidth: '150px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    
      uploadedImageLabel:{
        marginBottom: '20px',
      }
    };
    
  return (
    <div style={styles.UploadButtonContainer}>
      <div>
        <label>
          <p style={styles.uploadedImageLabel}>{buttonText} </p>
        </label>
        <input 
          type="file"
          style={styles.label}
          onChange={handleFileChange}
        />
      </div>

      <div style={styles.uploadedImageContainer}>
        {uploadedImage && (
          <div >   
            <div>
              <p style={styles.uploadedImageLabel}>Uploaded Image :</p>
            <img src={uploadedImage} alt="Uploaded" style={styles.uploadedImage} /> </div>
            <div> <button onClick={handleButtonClick}>Detect </button> </div>
            
           
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadButton;
