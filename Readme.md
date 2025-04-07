# NASA Picture of the Day Web App

This is a simple and elegant web application that displays NASA’s Astronomy Picture of the Day (APOD) along with an inspirational quote. The application is styled in a polaroid format, where the picture is presented as if it's a polaroid photograph, and the quote appears in the white space typically found at the bottom of such photos. Users can click a button to generate a new quote without refreshing the image, offering a calm and creative experience each day.

## Features

- Fetches NASA's Astronomy Picture of the Day using the NASA APOD API.
- Displays a random quote from the ZenQuotes API beneath the image.
- Initially loads a landing page with a "Get Today's Space Picture" button.
- On click, reveals the image and quote in a polaroid layout.
- A persistent button allows users to generate a new quote at any time.
- Modern, space-themed CSS for immersive visuals.
- Built using Node.js, Express, EJS templates, and vanilla JavaScript.

## Installation

1. Clone the repository:

2. Install dependencies:

3. Replace the default NASA API key (`DEMO_KEY`) with your own key for production use:

- Visit https://api.nasa.gov to get a free key.
- Replace the value of `NASA_API_KEY` in `app.js`.

## Usage
To start the server, run: `npm start`
Then open your browser and navigate to: `http://localhost:3000`
Click "Get Today's Space Picture" to view the NASA image of the day along with an inspirational quote. Click "Generate New Quote" to refresh only the quote without changing the picture.

## Project Structure
/project-root
│
├── app.js
├── /views
│   ├── index.ejs
│   └── /partials
│       ├── header.ejs
│       └── footer.ejs
├── /public
│   └── styles.css
├── package.json


## APIs Used
- NASA Astronomy Picture of the Day (APOD) API: `https://api.nasa.gov`
- ZenQuotes API: `https://zenquotes.io/`

## Author
Created by Jevon Teul. Contributions, feedback, and forks are welcome.


