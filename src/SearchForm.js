import React, { useState} from "react";
import "./SearchForm.css";

function SearchForm() {

    const APIKEY = "AIzaSyDVEsjqs8Kq343K8tBWrFp7Uc59nESI3qU";

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


    const submitHandler = async e => {
        e.preventDefault();
        const url = "https://www.googleapis.com/books/v1/volumes?q=";
        try {
            const response = await fetch(url + query + "&key=" + APIKEY);
            const data = await response.json();
            console.log(data);
            setResults(data.items);
        } catch (error) {
            console.log("error", error);
            setResults([]);
        }
    }

    return (
        <div>
            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Google_Books_logo_2015.svg/1200px-Google_Books_logo_2015.svg.png"/>
            <form onSubmit={submitHandler}>
                <input type="text"
                       value={query}
                       onChange={e => setQuery(e.target.value)}/>
                <button type="submit"> Search</button>
            </form>
                <div className="cards">
                    {results.map(book => (
                        <div className="card">
                            <img className="card-img-top" src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{book.volumeInfo.title}</h5>
                                <h6 className="card-subtitle"> {book.volumeInfo.subtitle}</h6>
                                <p className="card-text">{book.volumeInfo.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

        </div>

    )

}

export default SearchForm;
