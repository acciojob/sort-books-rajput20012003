
import React,{useState,useEffect} from "react";
import './../styles/App.css';
import axios from "axios";
import 'regenerator-runtime/runtime';

const App = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes`
      );
      console.log(response.data.items)
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortBooks = () => {
    switch (sortBy) {
      case 'author':
        return [...books].sort((a, b) => a.volumeInfo.authors[0].localeCompare(b.volumeInfo.authors[0]));
      case 'publisher':
        return [...books].sort((a, b) => a.volumeInfo.publisher.localeCompare(b.volumeInfo.publisher));
        default:
          return [...books].sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    }
  };

  const sortedBooks = sortBooks();

  return (
    <>
    <h1>Books List</h1>
         <label htmlFor="Order">Order
        sort by:
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} id="Order">
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
      </label>

      <table>
      <thead>
        <th>Title:</th>
        <th>Author:</th>
        <th>Publisher:</th>
      </thead>
      
        {sortedBooks.map((book) => (
          <tr>
            <td key={book.id}>
            {book.volumeInfo.title}
          </td>
          <td>
          {book.volumeInfo.authors[0]}
          </td>
          <td>
            {book.volumeInfo.publisher}
          </td>
          </tr>         
        ))}
      </table>
    </>
  )
}

export default App