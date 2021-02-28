import './App.css';
import React, {useState, useEffect} from 'react'


const App = () => {
  const[search, setSearch] = useState('');
  const[query, setQuery] = useState('React');
  const[results, setResults] = useState([]);
  const[loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchData(){
    try {
      setLoading(true);
      const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story`);
      const json = await response.json();
      setResults(
        json.hits.map(item =>{
          return [item.url,
          item.title,
          item.author,
          item.created_at,
        ]
      })
      )
    } finally {
      setLoading(false);
    }
  }
if (query !=='') {
  fetchData();
}
}, [query])




  return (
    <div className="App">
      <h1>Hackernews</h1>
      <form onSubmit={e =>
        {e.preventDefault();
        setQuery(search);}}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for news"/>
      <button type="submit"> Search</button>
    </form>
    <br/>
    {loading ? <h1>Hold my Beer!</h1> :
    results.map(item => (
      <div key={item}>
      <a href={item[0]} >{item[0]}</a>
      <br/>
      Title: {item[1]}
      <br/>
      Author: {item[2]}
      <br/>
      Release date: {item[3]}
      <br/>
      <br/>
      </div>
    ))
  }
    </div>
  );
}

export default App;
