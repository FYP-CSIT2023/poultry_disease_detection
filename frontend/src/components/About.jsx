import React from 'react';
import Navbar from './Navbar';
import './about.css';
import Chicken1 from '../assets/poultry.png';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-navbar">
        <Navbar style={{ marginTop: 0 }} />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">Poultry Disease Detection System</h1>
        <div className="para-img-container">
          <div className="para-div">
            <p className="about-paragraph">
              Poultry Disease Detection System is the web application that is
              used to detect the diseases in poultry birds such as Coccidiosis,
              Salmonella and New Castle Disease. This system uses the fecal
              images of the poultry birds to detect the diseases in them. The
              diseases are detected using the machine learning model that is
              trained on the fecal images of the poultry birds. The system is
              designed to help the farmers to keep their poultry birds healthy
              and to increase the productivity of the poultry farm. The system
              is designed to be user-friendly and easy to use.
            </p>

            <p className="about-paragraph">
              Salmonella, coccidiosis, and Newcastle disease are significant
              concerns in poultry farming. Salmonella poses a threat not only to
              the birds' health but also to human health through contaminated
              eggs and meat. Coccidiosis, caused by a protozoan parasite, leads
              to intestinal damage and decreased productivity in affected birds.
              Meanwhile, Newcastle disease, a highly contagious viral infection,
              can devastate poultry populations, causing respiratory, nervous,
              and digestive system issues.
            </p>
            <p className="about-paragraph">
              The model is trained using the Convolutional Neural Network (CNN).
              The model with 98.03% accuracy in testing dataset is used to
              detect the diseases.
            </p>
          </div>
          <div className="image-div">
            <img
              src={Chicken1}
              alt="poultry farm"
              className="about-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
