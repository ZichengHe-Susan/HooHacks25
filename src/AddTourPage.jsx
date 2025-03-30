import React, { useState } from 'react';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, FilterOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import './css/AddTourPage.css';
import { useNavigate } from 'react-router-dom';

const AddTourPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    museum: '',
    ageGroup: '',
    englishLevel: '',
    theme: '',
    duration: '',
    additionalRequirements: ''
  });

  const [error, setError] = useState(null);

  const museums = [
    "Metropolitan Museum of Art (The Met)",
    "Museum of Modern Art (MoMA)",
    "British Museum",
    "Louvre Museum",
    "Smithsonian National Museum of Natural History",
    "Fralin Museum of Art",
    "San Francisco Museum of Modern Art (SF MoMA)",
    "National Gallery of Art",
    "Tate Modern",
    "Museum of Contemporary Art"
  ];

  const ageGroups = ["Under 12", "12-18", "19-30", "31-50", "51-65", "Over 65"];
  const englishLevels = ["Native", "Advanced", "Intermediate", "Beginner", "Limited"];
  const durations = ["30 minutes", "1 hour", "1.5 hours", "2 hours", "2.5 hours", "3+ hours"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Tour created successfully");
        navigate('/homepage'); // Redirect after success
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create tour");
      }
    } catch (error) {
      setError("Error submitting form: " + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-tour-container">
      <header className="header">
        <div className="back-button" onClick={handleCancel}>
          <ArrowLeftOutlined /> Back to Plans
        </div>
        <div className="page-title">Create New Tour Plan</div>
        <div className="empty-space"></div>
      </header>

      <div className="tour-form-container">
        <form onSubmit={handleSubmit} className="tour-form">
          <div className="form-section">
            <h2 className="section-title">Basic Configuration</h2>
            <div className="form-group">
              <label htmlFor="museum">
                <EnvironmentOutlined /> Select Museum
              </label>
              <select id="museum" name="museum" value={formData.museum} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select a museum</option>
                {museums.map((museum, index) => (
                  <option key={index} value={museum}>{museum}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ageGroup">
                <UserOutlined /> Age Group
              </label>
              <select id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select age group</option>
                {ageGroups.map((age, index) => (
                  <option key={index} value={age}>{age}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="englishLevel">
                <GlobalOutlined /> English Proficiency
              </label>
              <select id="englishLevel" name="englishLevel" value={formData.englishLevel} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select proficiency level</option>
                {englishLevels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Tour Preferences</h2>
            <div className="form-group">
              <label htmlFor="theme">
                <FilterOutlined /> Tour Theme
              </label>
              <input type="text" id="theme" name="theme" value={formData.theme} onChange={handleChange} placeholder="e.g. Modern Art, Historical Paintings, Sculptures..." className="form-control" />
              <small className="form-hint">Describe the theme or focus of your tour</small>
            </div>

            <div className="form-group">
              <label htmlFor="duration">
                <ClockCircleOutlined /> Duration
              </label>
              <select id="duration" name="duration" value={formData.duration} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select duration</option>
                {durations.map((duration, index) => (
                  <option key={index} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="additionalRequirements">Additional Requirements (Optional)</label>
              <textarea id="additionalRequirements" name="additionalRequirements" value={formData.additionalRequirements} onChange={handleChange} placeholder="Any special requirements or preferences for your tour..." className="form-control textarea" rows="4"></textarea>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="submit-button">Create Tour Plan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourPage;
