# 🌤️ Weather Dashboard

A comprehensive weather dashboard built with ReactJS that provides real-time weather information, hourly forecasts, and historical weather data analysis using the Open-Meteo API.

## 🚀 Live Demo

[View Live Application](https://weather-dashboard.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Performance Optimization](#performance-optimization)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Page 1: Current Weather & Hourly Forecast

#### Current Weather Parameters
- **Temperature** (Current, Min, Max with °C/°F toggle)
- **Precipitation** levels
- **Sunrise & Sunset** times
- **Maximum Wind Speed** & direction
- **Relative Humidity**
- **UV Index**
- **Precipitation Probability**
- **Air Quality Metrics**:
  - PM10 & PM2.5
  - Carbon Monoxide (CO)
  - Carbon Dioxide (CO2)
  - Nitrogen Dioxide (NO2)
  - Sulphur Dioxide (SO2)

#### Hourly Data Visualizations
Interactive graphs for each parameter:
- Temperature Trends
- Relative Humidity Patterns
- Precipitation Analysis
- Visibility Levels
- Wind Speed Variations
- Combined PM10 & PM2.5 Chart

### Page 2: Historical Data Analysis (2-Year Range)

#### Historical Charts
- **Temperature**: Mean, Max & Min trends
- **Sun Cycle**: Sunrise & Sunset (IST timezone)
- **Precipitation**: Total precipitation over time
- **Wind Analysis**: Max wind speed & dominant direction
- **Air Quality**: PM10 & PM2.5 historical trends

#### Chart Features
- 📊 Multiple chart types (Line, Bar, Composed)
- 🔍 Zoom in/out functionality
- 📜 Horizontal scrolling for dense data
- 📱 Fully responsive design

### Additional Features
- 🎯 **Auto GPS Detection** - Automatically fetches user's location
- 🌡️ **Temperature Unit Toggle** - Switch between Celsius and Fahrenheit
- ⚡ **Performance Optimized** - Loads within 500ms
- 📱 **Mobile-First Design** - Perfect on all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **React Router v6** | Navigation & routing |
| **Recharts** | Data visualization & graphs |
| **Axios** | API calls |
| **Open-Meteo API** | Weather data source |
| **CSS3** | Styling & animations |

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
   cd weather-dashboard
