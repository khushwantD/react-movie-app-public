import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from "react-toastify";
import axios from "axios";

const ContextPage = createContext('');

export function MovieProvider({ children }) {

    const [ header, setHeader ] = useState('Trending')
    const [ movies, setMovies ] = useState([])
    const [ trending, setTrending ] = useState([])
    const [ upcoming, setUpcoming ] = useState([])
    const [ genres, setGenres ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ activeGenre, setActiveGenre ] = useState(28)
    const [ loader, setLoader ] = useState(true)
    const [ backGenre, setBackGenre ] = useState(false)
    const [ user, setUser ] = useAuthState(auth)
    const navigate = useNavigate()

    const APIKEY = import.meta.env.VITE_API_KEY

    if(page < 1) {
        setPage(1)
    }

    const filteredGenre = async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${activeGenre}&api_key=${APIKEY}&page=${page}`
        );
        const movies = await res.data
        setMovies(movies.results)
        setLoader(false)
        setHeader("Genres")
    }

    const fetchSearch = async (query) => {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${query}&page=1&include_adult=false`)
        const searchMovies = await res.data
        setMovies(searchMovies.results)
        setLoader(false)
        setHeader(`Results for | "${query}"`)
    }

    const fetchGenre = async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`
        );
        const gen = await res.data
        setGenres(gen.genres)
    }

    const fetchTrending = async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}&page=${page}`
        );
        const trending = await res.data
        setTrending(trending.results)
        setLoader(false)
        setHeader('Trending Movies')
    }

    const fetchUpcoming = async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${page}`
        );
        const upcoming = res.data
        setUpcoming(upcoming.results)
        setLoader(false)
        setHeader('Upcoming Movies')
    }

    const GetFavorite = () => {
        setLoader(false)
        setHeader('Favorites Movies')
    }

    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            navigate('/')
            toast.success("Login successful")
        } catch (err) {
            console.log(err);
            navigate('/')
        }
    }

    return (
        <ContextPage.Provider 
            value={{
                fetchGenre,
                genres,
                setGenres,
                filteredGenre,
                header,
                setHeader,
                movies,
                setMovies,
                page,
                setPage,
                activeGenre,
                setActiveGenre,
                fetchSearch,
                loader,
                setLoader,
                setBackGenre,
                backGenre,
                fetchTrending,
                trending,
                fetchUpcoming,
                upcoming,
                GetFavorite,
                GoogleLogin,
                user
            }}
        >
            {children}
        </ContextPage.Provider>
    )
}
export default ContextPage
