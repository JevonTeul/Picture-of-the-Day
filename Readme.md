# SpaceX Picture of the Day Web App

A modern web application showcasing stunning SpaceX launch images paired with inspirational quotes, presented in an elegant polaroid-style format.

## Features
- SpaceX Launch Gallery: Displays high-quality images from recent SpaceX missions
- Inspirational Quotes: Shows thought-provoking quotes from scientists and thinkers
- Smooth Transitions: Elegant fade animations between content
- Responsive Design: Works perfectly on all device sizes
- Smart Caching: Optimized API usage with intelligent fallbacks
- Minimalist UI: Clean, distraction-free interface focused on content

## Installation

1. Clone the repository:

2. Install dependencies:

3. Replace the default SpaceX API key (`DEMO_KEY`) with your own key for production use:

- Visit 'https://api.spacexdata.com/v4/launches' to get a free key.
- Replace the value of `NASA_API_KEY` in `app.js`.

## Usage
To start the server, run: `npm start`
Then open your browser and navigate to: `http://localhost:3000`

## Project Structure
/project-root
│
├── app.js
├── /views
│   ├── index.ejs
├── /public
│   └── styles.css
├── package.json


## APIs Used
- SpaceX: `https://api.spacexdata.com/v4/launches`
- ZenQuotes API: `https://zenquotes.io/`

## Author
Created by Jevon Teul. Contributions, feedback, and forks are welcome.


