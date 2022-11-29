import './AllGames.css'
import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';


export default function AllGames() {
    const [allgames, setAllGames] = useState([]);
    const [count, setCOunt] = useState(20);
    let navigate = useNavigate()
    async function getGames() {
        let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
            headers: {
                'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        setAllGames(data)
    }
    useEffect(() => {
        getGames()
    }, [])
    function moreGames() {
        
        setCOunt(count+20);
    }
    function getDetails(id) {
        navigate(`/game-details/${id}`)
    }
  return <>
  <div className="container text-center mg">
      <div className="row">
          {allgames.length > 0 ? allgames.slice(0, count).map((game, index) =>
              <div key={index} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                  <div onClick={() => { getDetails(game.id) }}  title={game.platform === "PC (Windows)" ? 'Avaliable on Windows' : 'Avaliable on Browser'} className='shadow game-card'>
                      <img className='w-100' src={game.thumbnail} loading="lazy" alt={game.title} />
                      <div className="p-3 game-card-body">
                          <div className="d-flex justify-content-between align-items-center">
                              <h4 className='text-truncate text-white-50'>{game.title}</h4>
                              <h6 className='text-white free p-2'>FREE</h6>
                          </div>
                          <p className='text-truncate text-muted'>{game.short_description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                              <i className="fa-solid fa-square-plus text-white-50"></i>
                              <div>
                                  <span className='category px-2 rounded-3 me-2'>{game.genre}</span>
                                  {game.platform === 'PC (Windows)' ? <i className="fa-brands fa-windows text-secondary"></i> : <i className="fa-brands fa-chrome text-secondary"></i>}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ) : <Loading />}
      </div>
      {count > allgames.length ? null : <button onClick={moreGames} className='btn btn-outline-secondary'>More Games</button>}
  </div>
</>
}
