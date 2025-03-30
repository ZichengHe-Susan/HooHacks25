import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, MessageOutlined } from '@ant-design/icons';
import './css/ViewTourPlan.css';

const ViewTourPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, formData } = location.state || {}; // Retrieve AI-generated plan and form data

  // Handle the case where no plan is passed
  if (!plan) {
    return (
      <div className="view-tour-container">
        <h1>No Tour Plan Found</h1>
        <button onClick={() => navigate('/add-tour')}>Go Back</button>
      </div>
    );
  }

  const handleSavePlan = async () => {
    try {
      // Fetch the logged-in user
      const userResponse = await fetch('http://localhost:5001/auth/user', { credentials: 'include' });
      const userData = await userResponse.json();

      if (!userData || !userData.id) {
        console.error("User not logged in.");
        return;
      }

      const response = await fetch('http://localhost:5001/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: userData.id })
      });

      if (response.ok) {
        console.log("Tour saved successfully");
        navigate('/homepage'); // Redirect to homepage
      } else {
        const errorData = await response.json();
        console.error("Failed to save tour:", errorData.error);
      }
    } catch (error) {
      console.error("Error saving tour:", error);
    }
  };

  const handleBack = () => {
    navigate('/homepage');
  };

  return (
    <div className="view-tour-container">
      {/* Header */}
      <header className="tour-header">
        <div className="back-button" onClick={handleBack}>
          <ArrowLeftOutlined /> Back to Plans
        </div>
        <div className="page-title">
          Your Tour Plan: {formData?.theme || 'Untitled Tour'}
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
        
        {plan.schedule.map((artwork, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'odd-row' : 'even-row'}`}>
            <div className="timeline-number">{index + 1}</div>
            <div className="artwork-card">
              <div className="artwork-image-container">
                <div className="artwork-image-placeholder">
                <img
                  src={artwork.imageURL || '/image/default_museum.jpg'}
                  alt={artwork.title}
                  className="artwork-image"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = '/image/default_museum.jpg'; // Fallback to default image
                  }}
                />
                </div>
              </div>
              
              <div className="artwork-info">
                <h3>{artwork.title} ({artwork.year || 'Unknown Year'})</h3>
                <p className="artist-name">{artwork.artist || 'Unknown Artist'}</p>
                <p className="time-allocated">
                  <ClockCircleOutlined /> {artwork.timeAllocated} minutes
                </p>
                <p className="location-info">
                  <EnvironmentOutlined /> {artwork.location || 'Unknown Location'}
                </p>
                <p className="artwork-description">{artwork.description || 'No description available.'}</p>
                
                <div className="interaction-section">
                  <h4><MessageOutlined /> Suggested Interactions</h4>
                  <ul className="question-list">
                    {artwork.activity ? (
                      <li>{artwork.activity}</li>
                    ) : (
                      <li>No suggested interactions available.</li>
                    )}
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