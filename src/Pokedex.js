/* eslint-disable */
import { useHistory} from 'react-router-dom';
import useAuth from './Auth/useAuth';
import getPokedex from './serivicios copy/getPokedex';
import './Pokedex.css';
import { useEffect, useState } from 'react';
import PokedexInfo from './PokedexInfo';
import Pagination from './Pagination';

const Pokedex = ()  => {
  const [pokemonesdata, setPokemonesData] = useState([])
  const[currentPage, setCurrentPage] = useState(1) 
  const[postsPerPage, setPostsPerPage] = useState(5) 

  const[pageNumberLimit, setpageNumberLimit] = useState(5) 
  const[maxpageNumberLimit, setmaxpageNumberLimit] = useState(5) 
  const[minpageNumberLimit, setminpageNumberLimit] = useState(0) 

  const handeclick = (event)=> {
    setCurrentPage(Number(event.target.id));
  }
  

  const auth = useAuth()
  let history = useHistory()

  useEffect(()=>{
    const getFunc = async () => {
      const data = await getPokedex()
      setPokemonesData(data)
    }
    getFunc()
  },[auth])

  const handleLogin = () => {
    auth.logout();
    history.push({pathname: '/login'})
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = pokemonesdata.slice(indexOfFirstPost, indexOfLastPost)
  const listPokemontSlice = currentPosts.map(pokemon => <PokedexInfo key={pokemon.url} pokemonUrl={pokemon.url}/>)



  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(pokemonesdata.length / postsPerPage); i++) {
      pageNumbers.push(i)
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if(number < maxpageNumberLimit+1 && number > minpageNumberLimit){
      return (
      <li key={number} id={number} 
          onClick={handeclick}
          className={currentPage == number ? "active" :null}
          >
          {number}
        </li>
      )
    } else {
      null
    }
  })

  const handleNextbtn  = ()=> {
    setCurrentPage(currentPage +1)

    if(currentPage+1> maxpageNumberLimit){
      setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit)
      setminpageNumberLimit(minpageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevbtn  = ()=> {
    setCurrentPage(currentPage -1)

    if((currentPage-1)% pageNumberLimit==0){
      setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit)
      setminpageNumberLimit(minpageNumberLimit - pageNumberLimit)
    }
  }

  let pageIncrementBtn = null;
  if(pageNumbers.length > maxpageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip;</li>
  }

  let pageDrecrementBtn = null;
  if(minpageNumberLimit>=1) {
    pageDrecrementBtn = <li onClick={handlePrevbtn}> &hellip;</li>
  }

  const handleLoadMore = () => {
    setPostsPerPage(postsPerPage + 5)
  }

  const handleLoadLess = () => {
    if(postsPerPage > 5){
     setPostsPerPage(postsPerPage - 5)
  }
  }
  if(postsPerPage){
  console.log(postsPerPage)
  }

  return (
    <div className="Pokedex">
      <h1>{auth.user}</h1>

      <ul className="pageNumbers">
        
        <li>
          <button onClick={handlePrevbtn}
            disabled={currentPage == pageNumbers[0]? true:false}         
          >
            Prev
          </button>
         </li>
          {pageDrecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

        <li>
          <button onClick={handleNextbtn}
          disabled={currentPage == pageNumbers[pageNumbers.length - 1]? true:false}         
          >
            Next
          </button>
        </li>
      </ul>

      <button onClick={handleLoadMore} className="loadmore">
        Load more
      </button>
      <button onClick={handleLoadLess} className="loadlless">
        Load less
      </button> 

      <button onClick ={handleLogin}>LogOut</button>
      {listPokemontSlice}
      
      {/* <Pagination postsPerPage={postsPerPage} totalPosts={pokemonesdata.length} paginate={paginate}/>  */}
    </div>

  );
}

export default Pokedex;
