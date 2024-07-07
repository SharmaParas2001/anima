import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimeDetail.css';

const AnimeDetail = ({ animeData }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const anime = animeData[index];

  if (!anime) return <p>Anime not found</p>;

  const { img2, title, titleJapanese, year, synopsis, trailer } = anime;

  return (
    <section className="anime2">
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <img className="anime2-img" src={img2} alt={title} />
        <label className="anime-title2">{title}</label>
        <label className="anime-title-japanese">{titleJapanese}</label>
        <label className="anime-year2">{year}</label>
        <p className="anime-synopsis">{synopsis}</p>
        {trailer && (
          <a className="anime-trailer" href={trailer} target="_blank" rel="noopener noreferrer">
            <button className="anime-btn">Watch Trailer</button>
          </a>
        )}
      </div>
    </section>
  );
};

export default AnimeDetail;
