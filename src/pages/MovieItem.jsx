import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { MenuFilters } from "../components/MenuFilters";
import { Select, Button, Image, Space } from "antd";
import { IMG_API_LOW } from "../globalVariables";
import { Link } from "react-router-dom";
import { InputNumber } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getMovie, getSimilarMovies } from "../store/actions/movie";
import {
  setTorrent,
  shutdown,
  resetStateTorrents,
  getTorrentMovie,
  getTorrentInfo,
} from "../store/actions/torrent";
import { resetStateSubtitles, getSubtitle } from "../store/actions/subtitles";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";
import { IMG_API_HIGH, NO_IMAGE } from "../globalVariables";

import { DownloadOutlined } from "@ant-design/icons";

export const MovieItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [movieDataPT, setMovieDataPT] = useState(null);
  const [movieDataUS, setMovieDataUS] = useState(null);

  const [selectedOptionSubtlite, setSelectedOptionSubtlite] = useState(null);
  const [selectedOptionTorrent, setSelectedOptionTorrent] = useState(null);
  const [torrentsList, setTorrentsList] = useState([]);
  const [subtitlesList, setSubtitlesList] = useState([]);

  const [numberTorrent, setNumberTorrent] = useState(15);
  const [similarityT, setSimilarityT] = useState(0.2);
  const [similarityS, setSimilarityS] = useState(0.2);

  const movieItem = useSelector((state) => state.movieItem);
  const movieList = useSelector((state) => state.movieList);
  const { loadingSimilarMovies, movies, results, pages } = movieList;
  const { loading, movie } = movieItem;
  const { title, poster_path, vote_average, release_date, overview, genres } =
    movie;
  const torrentList = useSelector((state) => state.torrentList);
  const { torrents, loadingTorrents, info } = torrentList;
  const subtitleList = useSelector((state) => state.subtitleList);
  const { subtitles, loadingSubtitles } = subtitleList;

  useEffect(() => {
    dispatch(getMovie(Number(id), setMovieDataPT, setMovieDataUS));
    dispatch(getSimilarMovies(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (torrents) {
      const data = torrents.map((item, index) => ({
        key: index,
        value: index,
        label:
          "(" +
          item.seeds +
          " " +
          item.size +
          ") " +
          item.title.substring(0, 30),
        magnet: item.magnet,
      }));

      setTorrentsList(data);
      setSelectedOptionTorrent(data[0]);
    }

    if (subtitles) {
      const data = subtitles.map((item, index) => ({
        key: index,
        id: item.id,
        filename: item.filename,
        downloads: item.downloads,
        language: item.language,
        url: item.url,
        label: item.label,
        score: item.score,
        value: index,
        label:
          "(" + item.downloads + ") " + item.filename.substring(0, 20) + "...",
      }));

      setSubtitlesList(data);
      setSelectedOptionSubtlite(data);
    }
  }, [torrents, subtitles]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(resetStateTorrents());

      if (movieDataPT && movieDataUS) {
        dispatch(
          getTorrentMovie(movieDataPT, movieDataUS, numberTorrent, similarityT)
        );
      }
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [numberTorrent, similarityT, movieDataPT, movieDataUS]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(resetStateSubtitles());

      if (movieDataPT && movieDataUS) {
        dispatch(getSubtitle(movieDataPT, movieDataUS, similarityS));
      }
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [similarityS, movieDataPT, movieDataUS]);

  const onPlay = () => {
    const callback = (e) => {
      navigate("/player", { replace: true });
    };

    dispatch(setTorrent(selectedOptionTorrent, movie, callback));
  };

  const onDownload = async () => {
    const callback2 = () => {
      dispatch(getTorrentInfo());
    };

    const callback = () => {
      setInterval(callback2, 2000);
    };

    dispatch(setTorrent(selectedOptionTorrent, movie, callback));
  };

  return (
    <Navbar
      noPagination={true}
      children={
        <>
          <div className="container">
            {loading ? (
              <Spinner />
            ) : (
              <div>
                <div className="details">
                  <Image
                    placeholder={
                      <Image
                        preview={false}
                        src={
                          poster_path ? IMG_API_HIGH + poster_path : NO_IMAGE
                        }
                      />
                    }
                    preview={false}
                    src={poster_path ? IMG_API_HIGH + poster_path : NO_IMAGE}
                  />
                  <div className="desc">
                    <h2>{title} </h2>
                    <span>IMDB: {vote_average} | </span>
                    <span>
                      <Moment format="MMM D, YYYY">{release_date}</Moment>
                    </span>
                    <div className="genres">
                      {genres &&
                        genres.map((genre, id) => (
                          <span key={genre.id}>
                            {(id ? ", " : "") + genre.name}{" "}
                          </span>
                        ))}
                    </div>

                    <div className={`overview`}>
                      <p>{overview}</p>
                    </div>

                    <div className="menu">
                      <div className="torrent">
                        <Select
                          style={{
                            width: 400,
                          }}
                          allowClear
                          loading={loadingTorrents}
                          placeholder={"Torrents..."}
                          value={selectedOptionTorrent}
                          options={torrentsList}
                          onChange={(e) =>
                            setSelectedOptionTorrent(torrentsList[e])
                          }
                        />

                        <InputNumber
                          disabled={loadingTorrents}
                          min={1}
                          max={500}
                          defaultValue={numberTorrent}
                          onChange={setNumberTorrent}
                        />

                        <InputNumber
                          disabled={loadingTorrents}
                          min={0}
                          max={1}
                          step="0.1"
                          defaultValue={similarityT}
                          onChange={setSimilarityT}
                        />
                      </div>
                      <div className="subtitles">
                        <Select
                          style={{
                            width: 400,
                          }}
                          mode="multiple"
                          allowClear
                          loading={loadingSubtitles}
                          value={selectedOptionSubtlite}
                          options={subtitlesList}
                          onChange={(e) => setSelectedOptionSubtlite(e)}
                          placeholder={"Select Item..."}
                          maxTagCount={"responsive"}
                        />
                        <InputNumber
                          disabled={loadingSubtitles}
                          min={0}
                          max={1}
                          step="0.1"
                          defaultValue={similarityS}
                          onChange={setSimilarityS}
                        />
                      </div>

                      <Button
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        onClick={onDownload}
                        size={"large"}
                      >
                        Download and play
                      </Button>
                    </div>

                    {/* <div style={{ display: `grid` }}>
                      <div className="info">{info ? info.peers : null} </div>

                      <div className="info">
                        mainFile {info ? info.files[0].size : null}
                      </div>

                      <div className="info">
                        downloaded {info ? info.downloaded : null}
                      </div>
                      <div className="info">
                        download_speed {info ? info.download_speed : null}
                      </div>
                      <div className="info">
                        state {info ? info.state : null}{" "}
                      </div>

                      <div className="info">
                        percent {info ? info.percent : null}{" "}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="similar">
                  <>
                    {loadingSimilarMovies ? (
                      <Spinner />
                    ) : results !== 0 ? (
                      <>
                        <div className="list-container-similar">
                          {movies.map(
                            (movie, index) =>
                              movie.poster_path && (
                                <div className="card-smiliar" key={index}>
                                  <Link to={`/movie/${movie.id}`}>
                                    <img
                                      src={IMG_API_LOW + movie.poster_path}
                                      alt={movie.title}
                                    />
                                    {/* <h3>{movie.title}</h3>
                                    <p>
                                      <span>{movie.vote_average * 10}% | </span>
                                      <span>
                                        <Moment format="MMM D, YYYY">
                                          {movie.release_date}
                                        </Moment>
                                      </span>
                                    </p> */}
                                  </Link>
                                </div>
                              )
                          )}
                        </div>
                      </>
                    ) : (
                      <h2 className="py-2 text-center">No Movies Found</h2>
                    )}
                  </>
                </div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};
