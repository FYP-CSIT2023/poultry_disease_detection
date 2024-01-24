import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UploadButton = ({ buttonText, icon, onUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        onUpload(file);
      } else {
        alert('Please choose a valid image file.');
      }
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
  
    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append('image', uploadedImage);
    console.log(uploadedImage);

    // Assuming you have a Django API endpoint at 'your-api-endpoint'
    axios.post('http://127.0.0.1:8000/detect/uploads/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // Handle the response data as needed
        console.log('API Response:', response.data.predicted_class);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
          <div style={styles.label}>Choose a File</div>
        </label>
      </div>

      <div style={styles.uploadedImageContainer}>
        {uploadedImage && (
          <div>
            <p style={styles.uploadedImageLabel}>Uploaded Image :</p>
            <img src={uploadedImage} alt="Uploaded" style={styles.uploadedImage} />
            <button onClick={handleButtonClick} disabled={loading}>
              {loading ? 'Loading...' : 'Detect'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

UploadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
