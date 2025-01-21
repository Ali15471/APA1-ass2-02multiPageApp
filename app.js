const express = require('express'); //Imports express
const app = express(); //Initialises Express
const port = 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Sample data
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
  { id: 2, title: "1984", author: "George Orwell", year: 1949, genre: "Science Fiction" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance" }
];

const authors = [
  { id: 1, name: "Harper Lee", birthYear: 1926, nationality: "American" },
  { id: 2, name: "George Orwell", birthYear: 1903, nationality: "British" },
  { id: 3, name: "Jane Austen", birthYear: 1775, nationality: "British" }
];

// Route for home page (list view)
app.get('/', (req, res) => {
  res.render('home', { books: books });
});

// Route for book details
app.get('/book/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).render('404');
  res.render('book-details', { book: book });
});

// Route for add book page (form)
app.get('/add-book', (req, res) => {
  res.render('add-book');
});

// Route to handle adding a new book
app.post('/add-book', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: parseInt(req.body.year),
    genre: req.body.genre
  };
  books.push(newBook);
  res.redirect('/');
});

app.get('/add-author', (req, res) => {
  res.render('add-author');
});

app.post('/add-author', (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.author,
    birthYear: parseInt(req.body.birthYear),
    nationality: req.body.nationality
  };
  authors.push(newAuthor);
  res.redirect('/');
});


// Route for authors page (table view)
app.get('/authors', (req, res) => {
  res.render('authors', { authors: authors });
});

// Route to handle the form submission and remove a book
app.post('/remove-book/:id', (req, res) => {  
  const bookId = parseInt(req.params.id, 10); // Ensure the ID is parsed as an integer  
  const bookIndex = books.findIndex(b => b.id === bookId); // Find the index of the book  
  
  if (bookIndex === -1) {  
    return res.status(404).render('404'); // Render a 404 page if the book is not found  
  }  
  
  books.splice(bookIndex, 1); // Remove the book at the found index  
  res.redirect('/'); // Redirect to the home page  
});  



// Start the server
app.listen(port, () => {
  console.log(`Book Library app listening at http://localhost:${port}`);
});

