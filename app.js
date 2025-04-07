import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Configuration
const SPACEX_API = 'https://api.spacexdata.com/v4/launches';
const QUOTE_API = 'https://zenquotes.io/api/random';

// Fallback data
const FALLBACK_IMAGES = [
  {
    url: 'https://live.staticflickr.com/65535/50618376646_8471f74b13_o.jpg',
    title: 'Falcon 9 Launch'
  },
  {
    url: 'https://live.staticflickr.com/65535/50630836888_30f6cef4c9_o.jpg',
    title: 'Starship Prototype'
  }
];

const FALLBACK_QUOTES = [
  { quote: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
  { quote: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" }
];

// Get SpaceX images
const getSpaceXImages = async () => {
  try {
    const response = await axios.get(SPACEX_API, {
      timeout: 3000,
      params: { limit: 10, sort: '-date_utc' }
    });

    return response.data
      .filter(launch => launch.links.flickr?.original?.length > 0)
      .map(launch => ({
        url: launch.links.flickr.original[0],
        title: launch.name
      }));
  } catch (error) {
    console.error('SpaceX API error:', error.message);
    return FALLBACK_IMAGES;
  }
};

// Get random quote from ZenQuotes
const getRandomQuote = async () => {
  try {
    const response = await axios.get(QUOTE_API, { timeout: 3000 });
    
    if (response.data && response.data[0]) {
      return {
        quote: response.data[0].q,
        author: response.data[0].a
      };
    }
    throw new Error('Empty response');
  } catch (error) {
    console.error('Quote API error:', error.message);
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
};

// Routes
app.get('/', async (req, res) => {
  try {
    const [images, quote] = await Promise.all([
      getSpaceXImages(),
      getRandomQuote()
    ]);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    res.render('index', {
      imageUrl: randomImage.url,
      imageTitle: randomImage.title,
      quoteContent: quote.quote,
      quoteAuthor: quote.author
    });
  } catch (error) {
    console.error('Initial load error:', error);
    res.render('index', {
      imageUrl: FALLBACK_IMAGES[0].url,
      imageTitle: FALLBACK_IMAGES[0].title,
      quoteContent: FALLBACK_QUOTES[0].quote,
      quoteAuthor: FALLBACK_QUOTES[0].author
    });
  }
});

app.get('/next-content', async (req, res) => {
  try {
    const [images, quote] = await Promise.all([
      getSpaceXImages(),
      getRandomQuote()
    ]);
    res.json({
      imageUrl: images[Math.floor(Math.random() * images.length)].url,
      imageTitle: images[Math.floor(Math.random() * images.length)].title,
      quoteContent: quote.quote,
      quoteAuthor: quote.author
    });
  } catch (error) {
    console.error('Next content error:', error);
    res.json({
      imageUrl: FALLBACK_IMAGES[0].url,
      imageTitle: FALLBACK_IMAGES[0].title,
      quoteContent: FALLBACK_QUOTES[0].quote,
      quoteAuthor: FALLBACK_QUOTES[0].author
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});