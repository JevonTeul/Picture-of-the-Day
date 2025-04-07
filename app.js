import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Configuration
const NASA_API_KEY = 'DEMO_KEY'; 

// Fallback data
const FALLBACK_QUOTES = [
  {
    quote: "That's one small step for man, one giant leap for mankind.",
    author: "Neil Armstrong"
  },
  {
    quote: "The cosmos is within us. We are made of star-stuff.",
    author: "Carl Sagan"
  }
];

const FALLBACK_IMAGE = {
  url: 'https://apod.nasa.gov/apod/image/2205/NGC3576_1024.jpg',
  title: 'NGC 3576: The Statue of Liberty Nebula'
};

// Get NASA Picture of the Day
const getNASAPicture = async () => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, {
      timeout: 5000
    });
    
    if (response.data.media_type === 'image') {
      return {
        url: response.data.url,
        title: response.data.title
      };
    }
    throw new Error('Not an image');
  } catch (error) {
    console.error('NASA API error:', error.message);
    return FALLBACK_IMAGE;
  }
};

// Get random quote
const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random', { timeout: 3000 });

    if (response.data && response.data.length > 0) {
      return {
        quote: response.data[0].q,
        author: response.data[0].a || "Unknown"
      };
    }

    throw new Error('Invalid quote response');
  } catch (error) {
    console.error('ZenQuotes API error:', error.message);
    // Use your fallback quotes if the API fails
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
};


// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'NASA Picture of the Day',
    initialView: true
  });
});

app.get('/get-content', async (req, res) => {
  try {
    const [nasaData, quoteData] = await Promise.all([
      getNASAPicture(),
      getRandomQuote()
    ]);
    
    res.json({
      imageUrl: nasaData.url,
      imageTitle: nasaData.title,
      quote: quoteData.quote,
      author: quoteData.author
    });
  } catch (error) {
    console.error('Content fetch error:', error);
    const fallbackQuote = FALLBACK_QUOTES[0];
    res.json({
      imageUrl: FALLBACK_IMAGE.url,
      imageTitle: FALLBACK_IMAGE.title,
      quote: fallbackQuote.quote,
      author: fallbackQuote.author
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});