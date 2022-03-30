import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-red.css";
import Select from "react-select";
import Moment from "react-moment";
import {
  getMovie,
  removeFromFavs,
  addToFavs,
} from "../store/actions/movieActions";
import { startTorrent } from "../store/actions/torrentActions";
import { resetStateTorrents } from "../store/actions/torrentActions";
import { resetStateSubtitles } from "../store/actions/subtitlesActions";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";

import { IMG_API_HIGH, NO_IMAGE } from "../globalVariables";

export const MovieItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOptionSubtlite, setSelectedOptionSubtlite] = useState(null);
  const [selectedOptionTorrent, setSelectedOptionTorrent] = useState(null);
  const [torrentsList, setTorrentsList] = useState(null);
  const [subtitlesList, setSubtitlesList] = useState(null);
  const movieItem = useSelector((state) => state.movieItem);
  const { loading, movie } = movieItem;
  const { title, poster_path, vote_average, release_date, overview, genres } =
    movie;
  const favoriteList = useSelector((state) => state.favoriteList);
  const { favorites } = favoriteList;
  const torrentList = useSelector((state) => state.torrentList);
  const { torrents, loadingTorrents, loadingPlay } = torrentList;
  const subtitleList = useSelector((state) => state.subtitleList);
  const { subtitles, loadingSubtitles } = subtitleList;
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "blue" : "black",
      backgroundColor: "white",
      fontSize: 14,
    }),
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    singleValue: (styles, { data }) => ({ ...styles, fontSize: 14 }),
  };

  useEffect(() => {
    dispatch(getMovie(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(resetStateTorrents());
    dispatch(resetStateSubtitles());
  }, [loadingTorrents, loadingSubtitles]);

  useEffect(() => {
    if (torrents.length > 0) {
      const data = torrents.map((item, index) => ({
        value: index,
        label:
          item.seeds +
          " " +
          item.size +
          " " +
          item.title.substring(0, 30) +
          "...",
        magnet: item.magnet,
      }));

      setTorrentsList(data);
      setSelectedOptionTorrent(data[0]);
    }

    if (subtitles.length > 0) {
      const data = subtitles.map((item, index) => ({
        value: index,
        label:
          item.downloads +
          " " +
          item.score +
          " " +
          item.filename.substring(0, 30) +
          "...",
        url: item.url,
      }));

      setSubtitlesList(data);
      setSelectedOptionSubtlite(data[0]);
    }
  }, [torrents, subtitles]);

  const onPlay = () => {
    dispatch(startTorrent(selectedOptionTorrent, Number(id)));
  };

  const onBack = () => {
    navigate(-1);
  };

  const onChangeTorrent = (e) => {
    setSelectedOptionTorrent(e);
  };

  const onChangeSubtitle = (e) => {
    setSelectedOptionSubtlite(e);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="button-play" style={{ paddingTop: "20px" }}>
            {
              <button
                style={{ width: "100px", height: "40px" }}
                onClick={() => {
                  onBack();
                }}
              >
                Voltar
              </button>
            }
          </div>
          <div className="details">
            <img
              src={poster_path ? IMG_API_HIGH + poster_path : NO_IMAGE}
              alt={title}
            />
            <div className="desc">
              <h2>
                {title}{" "}
                <span>
                  {favorites &&
                  favorites.find((fav) => fav.id === Number(id)) ? (
                    <i
                      className="fas fa-heart"
                      onClick={() => dispatch(removeFromFavs(Number(id)))}
                      style={{
                        color: "#EE515E",
                        fontSize: "2.1rem",
                        cursor: "pointer",
                      }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-heart"
                      onClick={() => dispatch(addToFavs(movie))}
                      style={{
                        fontSize: "2.1rem",
                        cursor: "pointer",
                      }}
                    ></i>
                  )}
                </span>
              </h2>
              <span>{vote_average * 10}% | </span>
              <span>
                <Moment format="MMM D, YYYY">{release_date}</Moment>
              </span>
              <div className="genres">
                {genres &&
                  genres.map((genre, id) => (
                    <span key={genre.id}>{(id ? ", " : "") + genre.name} </span>
                  ))}
              </div>

              <div className={`overview`}>
                <p>{overview}</p>
              </div>

              <div className="select">
                <div className="button-play">
                  {
                    <AwesomeButton
                      type="primary"
                      disabled={
                        loadingTorrents ||
                        loadingSubtitles ||
                        torrentsList?.length
                      }
                      onPress={() => {
                        onPlay();
                      }}
                    >
                      Play
                    </AwesomeButton>
                  }
                </div>
                <div className="Select-torrent">
                  <Select
                    styles={customStyles}
                    value={selectedOptionTorrent}
                    isSearchable={false}
                    isLoading={loadingTorrents}
                    onChange={(e) => onChangeTorrent(e)}
                    options={torrentsList ? torrentsList : []}
                  />
                </div>
                <div className="Select-subtitles">
                  <Select
                    styles={customStyles}
                    value={selectedOptionSubtlite}
                    isSearchable={false}
                    isLoading={loadingSubtitles}
                    onChange={(e) => onChangeSubtitle(e)}
                    options={subtitlesList ? subtitlesList : []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
