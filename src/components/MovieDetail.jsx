import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaPlay } from 'react-icons/fa'
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/no-image.jpg'
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

const MovieDetail = () => {
    const [ movieDet, setMovieDet ] = useState([])
    const [ movieCast, setMovieCast ] = useState([])
    const [ movieTrailar, setMovieTrailar ] = useState([])
    const [ movieGenres, setMovieGenres ] = useState([])

    const { id } = useParams()
    const APIKEY = import.meta.env.VITE_API_KEY;

   const fetchMovie = async () => {
     const res = await axios.get(
       `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
     );
     const moviedetail = await res.data;
     setMovieDet(moviedetail);
    //  console.log(moviedetail);
     setMovieGenres(moviedetail.genres);
   };

    const fetchCast = async () => {
      const castdata = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
      );
      const castdetail = await castdata.json();
      setMovieCast(castdetail.cast);
      
    };

    const fetchVideo = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
      );
      const videodata = await data.json();
      setMovieTrailar(videodata.results);
      // console.log(videodata.results);
    };


    useEffect(() => {
        fetchMovie()
        fetchCast()
        fetchVideo()
    }, [])
    console.log(movieCast);
    console.log(movieGenres);

    return (
      <div className="movie-detail">
        <Link
          to="/"
          className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
        >
          <HiChevronLeft />
        </Link>

        <div className="relative h-auto md:h-[82vh] flex justify-center">
          <div className="h-full w-full shadowbackdrop absolute"></div>
          <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
            {movieDet.original_title}
          </h1>
          {movieDet.backdrop_path === null ? (
            <img src={noimage} className="h-full w-full" />
          ) : (
            <img
              src={
                "https://image.tmdb.org/t/p/original/" + movieDet.backdrop_path
              }
              className="h-full w-full"
            />
          )}
        </div>

        <h2 className="text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]">
          {movieDet.overview}
        </h2>

        <div className="text-blue-100 font-semibold my-3 flex justify-center">
          <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
            Release Date : {movieDet.release_date}
          </h2>
        </div>

        <div className="flex justify-center flex-wrap">
          {movieGenres.map((tag) => (
              <div
                key={tag.id}
                className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
              >
                {tag.name}
              </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">
            Cast
          </h1>

          <div
            className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3"
          >
            {movieCast.map((cast, index) => (
              <div key={index}>
                {cast.profile_path !== null ? (
                  <div>
                    <div className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1">
                      <LazyLoadImage
                        effect="blur"
                        src={
                          "https://image.tmdb.org/t/p/w500" + cast.profile_path
                        }
                        className="w-full h-full rounded-xl"
                      />
                      <p className="text-white">{cast.name}</p>
                      <p className="text-blue-300">({cast.character})</p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
          {movieTrailar.map((trail, index) => (
            <div key={index}>
              {trail.type === "Trailer" ? (
                <>
                  <a
                    key={trail.id}
                    href={"https://www.youtube.com/watch?v=" + trail.key}
                    target="_blank"
                    className="flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white" rel="noreferrer"
                  >
                    <FaPlay />
                    Watch trailer
                  </a>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
}

export default MovieDetail