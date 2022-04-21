import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSerial, getEpisode } from "../store/actions/serial";
import { Navbar } from "../components/Navbar";
import Moment from "react-moment";
import Select from "react-select";

import {
  playTorrent,
  shutdown,
  resetStateTorrents,
  getTorrentTV,
} from "../store/actions/torrent";

import { Spinner } from "../components/Spinner";
import { IMG_API_HIGH, NO_IMAGE } from "../globalVariables";

export const SerialItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedOptionSubtlite, setSelectedOptionSubtlite] = useState(null);
  const [selectedOptionTorrent, setSelectedOptionTorrent] = useState(null);
  const [selectedSeasom, setSelectedSeasom] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [torrentsList, setTorrentsList] = useState(null);
  const [subtitlesList, setSubtitlesList] = useState(null);
  const [seasomList, setSeasomsList] = useState([]);
  const [episodeList, setEpisodeList] = useState(null);

  const [isShown, setIsShown] = useState(false);

  const serialItem = useSelector((state) => state.serialItem);
  const { loading, serial, episode } = serialItem;
  const { name, poster_path, first_air_date, vote_average, overview, genres } =
    serial;

  // const {name overview ,air_date,still_path} = episode.name;

  const torrentList = useSelector((state) => state.torrentList);
  const { torrents, loadingTorrents } = torrentList;

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
    dispatch(getSerial(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (serial.seasons) {
      let seasons = [];

      serial.seasons.forEach((item, index, arr) => {
        if (item.name !== "Specials") {
          seasons.push({
            label: item.name,
            value: item.season_number,
            episode_count: item.episode_count,
          });
        }
      });

      setSeasomsList(seasons);
    }
  }, [serial]);

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
  }, [torrents]);

  const onChangeTorrent = (e) => {
    setSelectedOptionTorrent(e);
  };

  const onChangeSubtitle = (e) => {
    setSelectedOptionSubtlite(e);
  };

  const onChangeSeasom = (e) => {
    setSelectedSeasom(e);

    let episodes = [];

    for (let i = 1; i <= e.episode_count; i++) {
      episodes.push({
        label: "Episode " + i,
        value: i,
      });
    }

    setEpisodeList(episodes);

    if (selectedEpisode && selectedEpisode.value > episodes.length) {
      setSelectedEpisode(episodes[0]);
    }
  };

  const onChangeEpisode = (e) => {
    setSelectedEpisode(e);

    if (selectedSeasom && selectedEpisode)
      dispatch(
        getTorrentTV(serial, selectedSeasom.value, selectedEpisode.value)
      );
  };

  useEffect(() => {
    if (selectedSeasom && selectedEpisode)
      dispatch(
        getEpisode(Number(id), selectedSeasom.value, selectedEpisode.value)
      );
  }, [selectedSeasom, selectedEpisode]);

  return (
    <div className="container">
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="details">
          <img
            src={poster_path ? IMG_API_HIGH + poster_path : NO_IMAGE}
            alt={name}
          />
          <div className="desc">
            <h2>{name}</h2>

            <span>{vote_average * 10}% | </span>

            <span>
              <Moment format="MMM D, YYYY">{first_air_date}</Moment>
            </span>

            <div className="genres">
              {genres &&
                genres.map((genre, id) => (
                  <span key={genre.id}>{(id ? ", " : "") + genre.name} </span>
                ))}
            </div>
            <p>{overview}</p>

            <div className="menu">
              <div className="seasom-episode">
                <div className="Select-seasom">
                  <Select
                    styles={customStyles}
                    isSearchable={false}
                    onChange={(e) => onChangeSeasom(e)}
                    value={selectedSeasom}
                    options={seasomList}
                  />
                </div>

                <div className="Select-episode">
                  <Select
                    styles={customStyles}
                    isSearchable={false}
                    onChange={(e) => onChangeEpisode(e)}
                    value={selectedEpisode}
                    options={episodeList}
                  />
                </div>
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

            {episode && (
              <div className="detailsEpisode">
                <img src={IMG_API_HIGH + episode.still_path} alt={name} />
                <div className="descEpisode">
                  <h2>{episode.name}</h2>

                  <span>{episode.vote_average * 10}% | </span>

                  <span>
                    <Moment format="MMM D, YYYY">{episode.air_date}</Moment>
                  </span>
                  <p> {episode.overview}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
