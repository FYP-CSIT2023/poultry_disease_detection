import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const UploadButton = ({ buttonText, onUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState('');

  const handleFileChange = (e) => {
    setResponseData('');
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const filetype = file.type;
      if (
        filetype === 'image/jpeg' ||
        filetype === 'image/png' ||
        filetype === 'image/jpg'
      ) {
        setUploadedImage(URL.createObjectURL(file));
        onUpload(file);
      } else {
        alert('Please choose a valid image file.');
      }
    }
  };

  const handleButtonClick = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    axios
      .post('http://127.0.0.1:8000/detect/uploads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setResponseData(response.data.predicted_class);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const styles = {
    UploadButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '85vh',
      border: '1px solid #3498db',
      marginTop: '110px',
    },

    label: {
      cursor: 'pointer',
      backgroundColor: '#3498db',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '24px',
    },

    labelImg: {
      maxWidth: '50px',
      marginBottom: '10px',
    },

    uploadedImageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
      textAlign: 'center',
    },

    uploadedImage: {
      width: '450px',
      height: '450px',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },

    uploadedImageLabel: {
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 600,
    },
    uploadImageContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    predictClassTxt: {
      fontSize: '30px',
      color: '#3498db',
    },
    detectBtn: {
      fontSize: '24px',
      padding: '10px 20px',
      backgroundColor: '#49be25',
      borderRadius: '5px',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#111111c9',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '15px',
        }}
      >
        <Navbar />
      </div>
      <div style={styles.UploadButtonContainer}>
        <div>
          <label>
            <p style={styles.uploadedImageLabel}>{buttonText} </p>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div style={styles.label}>Choose a File</div>
          </label>
        </div>

        <div style={styles.uploadedImageContainer}>
          {uploadedImage && (
            <div style={styles.uploadImageContainer}>
              <p style={styles.uploadedImageLabel}>Uploaded Image :</p>
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={styles.uploadedImage}
              />
              <button
                style={styles.detectBtn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Detect'}
              </button>
              {responseData && (
                <p style={styles.predictClassTxt}>
                  The predicted class is: {responseData}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

UploadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
