import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, MessageOutlined } from '@ant-design/icons';
import './css/ViewTourPlan.css';

const ViewTourPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  
  // Sample artwork data (this would normally come from your AI generation)
  const artworks = [
    {
      id: 1,
      title: "Portrait of Jean Dandois",
      image: "./image/fralin1.jpg", // You'll need actual image paths
      artist: "Gustave Caillebotte",
      year: "1885",
      location: "Gallery 2, East Wing, 1st Floor",
      description: "This portrait shows a man in formal attire, reflecting the style of Parisian society in the late 19th century.",
      suggestedQuestions: [
        "Notice the positioning of the figure and how it creates a sense of formality. How does this compare to modern portraiture?",
        "What can we learn about social class from the clothing and posture of the subject?"
      ]
    },
    {
      id: 2,
      title: "Paris Street, Rainy Day",
      image: "./image/fralin1.jpg",
      artist: "Gustave Caillebotte",
      year: "1877",
      location: "Gallery 3, Main Exhibition Hall",
      description: "One of Caillebotte's most famous works depicting modern urban life in Paris after Haussmann's renovation.",
      suggestedQuestions: [
        "How does the artist use perspective to create depth in this urban scene?",
        "What does this painting tell us about city life in late 19th century Paris?"
      ]
    },
    // Add more artworks as needed
  ];

  const handleSavePlan = () => {
    // Here you would save the plan to a backend
    // For now, just redirect to home
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="view-tour-container">
      {/* Header */}
      <header className="tour-header">
        <div className="back-button" onClick={handleBack}>
          <ArrowLeftOutlined /> Back to Plans
        </div>
        <div className="page-title">
          Your Tour Plan: {formData?.museum}
        </div>
        <div className="save-button" onClick={handleSavePlan}>
          Save Plan
        </div>
      </header>

      {/* Tour Details Summary */}
      <div className="tour-summary">
        <h2>Tour Details</h2>
        <div className="summary-details">
          <div className="summary-item">
            <EnvironmentOutlined />
            <span>{formData?.museum}</span>
          </div>
          <div className="summary-item">
            <ClockCircleOutlined />
            <span>{formData?.duration}</span>
          </div>
          <div className="summary-item">
            <span>Theme: {formData?.theme || "General Tour"}</span>
          </div>
        </div>
      </div>

      {/* Artwork Timeline */}
      <div className="artwork-timeline">
        <h2 className="artwork-journey-title">Recommended Artwork Journey</h2>
        
        {artworks.map((artwork, index) => (
          <div key={artwork.id} className={`timeline-item ${index % 2 === 0 ? 'odd-row' : 'even-row'}`}>
            <div className="timeline-number">{index + 1}</div>
            <div className="artwork-card">
              <div className="artwork-image-container">
                <div className="artwork-image-placeholder">
                  <img src={artwork.image} alt={artwork.title} className="artwork-image" />
                </div>
              </div>
              
              <div className="artwork-info">
                <h3>{artwork.title} ({artwork.year})</h3>
                <p className="artist-name">{artwork.artist}</p>
                <p className="location-info">
                  <EnvironmentOutlined /> {artwork.location}
                </p>
                <p className="artwork-description">{artwork.description}</p>
                
                <div className="interaction-section">
                  <h4><MessageOutlined /> Suggested Interactions</h4>
                  <ul className="question-list">
                    {artwork.suggestedQuestions.map((question, qIndex) => (
                      <li key={qIndex}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="timeline-end">
          <div className="end-marker">End of Tour</div>
          <button className="save-plan-button" onClick={handleSavePlan}>
            Save This Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTourPlan;