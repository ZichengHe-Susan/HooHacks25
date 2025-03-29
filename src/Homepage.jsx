import React, { useState } from 'react';
import { SearchOutlined, SettingOutlined, BellOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import './css/Homepage.css'; 

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Mindfulness Tour – The Met',
      type: 'Theme: Mindfulness',
      image: './image/fralin1.jpg'
    },
    {
      id: 2,
      title: 'Historical Highlights – British Museum',
      type: 'Theme: Historical Exploration',
      image: './image/fralin1.jpg'
    },
    {
      id: 3,
      title: 'Engagement Trail – SF MoMA',
      type: 'Theme: Visitor Engagement',
      image: './image/fralin1.jpg'
    },
    {
      id: 4,
      title: 'Solo Calm Walk – Louvre',
      type: 'Theme: Peaceful Strolling',
      image: './image/fralin1.jpg'
    },
    {
      id: 5,
      title: 'Ancient Civilizations – Smithsonian',
      type: 'Theme: Ancient Worlds',
      image: './image/fralin1.jpg'
    }
  ]);  

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="search-bar">
          <SearchOutlined className="search-icon" />
          <input type="text" placeholder="Search for plans" className="search-input" />
        </div>
        <div className="user-controls">
          <SettingOutlined className="icon" />
          <BellOutlined className="icon" />
          <div className="user-avatar">
            <span>S</span>
          </div>
          <div className="user-info">
            <span>Visitor</span>
            <span className="username">Susan He</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="banner-content">
          <h1 className="banner-title">项目</h1>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-left">
          <div className="filter-dropdown">
            <span>Catagory</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="filter-dropdown">
            <span>Last Edit</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="filter-right">
          <div className="sort-control">
            <SwapOutlined className="sort-icon" rotate={90} />
            <span>Most Relevant</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="view-toggle">
            <span className="list-icon">☰</span>
          </div>
          <button className="create-button">
            <PlusOutlined />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div 
          className={`tab ${selectedTab === 'All' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('All')}
        >
          All
        </div>
        <div 
          className={`tab ${selectedTab === 'Folder' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('Folder')}
        >
          Folder
        </div>
        
      </div>

      {/* Recent Designs Section */}
      <div className="recent-designs">
        <h2 className="section-title">Recent Plans</h2>
        <div className="project-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-type">{project.type}</p>
              </div>
            </div>
          ))}
          <div className="project-card empty-card">
            <div className="empty-indicator">
              <PlusOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;