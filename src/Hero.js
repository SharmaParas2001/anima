import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ animeData }) => {
  return (
    <div className="hero">
      {animeData.length === 0 ? (
        <p>No results found</p>
      ) : (
        animeData.map((anime, index) => (
          <section className="anime" key={index}>
            <Link to={`/anime/${index}`}>
              <img className="anime-img" src={anime.img} alt={anime.title} />
              <label className="anime-title">{anime.title}</label>
            </Link>
          </section>
        ))
      )}
    </div>
  );
};

export default Hero;
