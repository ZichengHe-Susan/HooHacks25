import React, { useState, useEffect } from 'react';
import { SearchOutlined, SettingOutlined, BellOutlined, PlusOutlined, SwapOutlined, LogoutOutlined } from '@ant-design/icons';
import './css/Homepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    fetch('http://localhost:5001/auth/user', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setUser(data);
        } else {
          navigate('/');
        }
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [navigate]);

  // Fetch only the logged-in user's tours
  const fetchUserProjects = async () => {
    try {
      if (user) {
        const response = await fetch(`http://localhost:5001/api/tours?user=${user.id}`);
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    if (user) fetchUserProjects();
  }, [user]);

   // Handle user logout
   const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/auth/logout', { credentials: 'include' });
      window.location.href = '/'; // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  // Placeholder data for testing without MongoDB
  // const fetchProjects = async () => {
  //   try {
  //     setProjects([
  //       { id: 1, title: 'Mindfulness Tour – The Met', type: 'Theme: Mindfulness', image: './image/fralin1.jpg' },
  //       { id: 2, title: 'Historical Highlights – British Museum', type: 'Theme: Historical Exploration', image: './image/fralin1.jpg' },
  //       { id: 3, title: 'Engagement Trail – SF MoMA', type: 'Theme: Visitor Engagement', image: './image/fralin1.jpg' },
  //       { id: 4, title: 'Solo Calm Walk – Louvre', type: 'Theme: Peaceful Strolling', image: './image/fralin1.jpg' },
  //       { id: 5, title: 'Ancient Civilizations – Smithsonian', type: 'Theme: Ancient Worlds', image: './image/fralin1.jpg' }
  //     ]);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   }
  // };

  const handleCreateTour = () => {
    navigate('/add-tour');
  };

  // Search functionality
  const filteredProjects = projects.filter(project =>
  project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting functionality
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="home-container">
      <header className="header">
        <div className="search-bar">
          <SearchOutlined className="search-icon" />
          <input
            type="text"
            placeholder="Search for plans"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="user-controls">
          <SettingOutlined className="icon" />
          <BellOutlined className="icon" />
          {user ? (
            <>
              <img src={user.photos[0].value} alt="User Profile" className="user-avatar" />
              <div className="user-info">
                <span>{user.displayName}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <LogoutOutlined /> Logout
              </button>
            </>
          ) : (
            <>
              <div className="user-avatar">
                <span>S</span>
              </div>
              <div className="user-info">
                <span>Visitor</span>
                <span className="username">Susan He</span>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="hero-banner">
        <div className="banner-content">
          <h1 className="banner-title">项目</h1>
        </div>
      </div>

      <div className="filter-controls">
        <div className="filter-left">
          <div className="filter-dropdown">
            <span>Category</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="filter-dropdown">
            <span>Last Edit</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="filter-right">
          <div className="sort-control" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <SwapOutlined className="sort-icon" rotate={90} />
            <span>Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="view-toggle">
            <span className="list-icon">☰</span>
          </div>
          <button className="create-button" onClick={handleCreateTour}>
            <PlusOutlined />
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${selectedTab === 'All' ? 'tab-active' : ''}`} onClick={() => setSelectedTab('All')}>
          All
        </div>
        <div className={`tab ${selectedTab === 'Folder' ? 'tab-active' : ''}`} onClick={() => setSelectedTab('Folder')}>
          Folder
        </div>
      </div>

      <div className="recent-designs">
        <h2 className="section-title">Recent Plans</h2>
        <div className="project-grid">
          {sortedProjects.map(project => (
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
          <div className="project-card empty-card"onClick={handleCreateTour}>
            <div className="empty-indicator" >
              <PlusOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;