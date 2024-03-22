import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [pokemonList, setpokemonList] = useState([])
    const [searchResult, setsearchResult] = useState([])
    const [searchTerm, setsearchTerm] = useState('')

    useEffect(() => {
        const fetchpokemonList = async () => {
            try {
                const reponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setpokemonList(reponse.data.results);
                setsearchResult(reponse.data.results)
            } catch (e) {
                console.log(e)
            }
        }
        fetchpokemonList()
    }, [])

    const handleSearch = () => {
        if (!searchTerm) {
            setsearchResult(pokemonList)
        } else {
            const results = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setsearchResult(results)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const hightlightSearchTerm = (text) => {
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
        return parts.map((part, index) => part.toLowerCase() === searchTerm.toLowerCase() ? <mark key={index}>{part}</mark> : part)
    }
  return (
    <div className="Search">
      <input
          className='search__input'
          type='text'
          placeholder='Search Pokemon'
          onChange={ e => setsearchTerm(e.target.value)}
          value={searchTerm}
          onKeyDown={handleKeyDown}
      />
        <br/>
        <p>Please press enter after entering search</p>
        <table>
            <thead>
                <tr className='table__header'>
                    <td>STT</td>
                    <td>Name Pokemon</td>
                </tr>
            </thead>
            <tbody>
                {searchResult.map((pokemon, index) => (
                    <tr key={index}>
                        <td>{index++}</td>
                        <td>{hightlightSearchTerm(pokemon.name)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default App;
