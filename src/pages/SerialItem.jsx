import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSerial } from "../store/actions/serial";
import { Navbar } from "../components/Navbar";
import Moment from "react-moment";
import Select from "react-select";

import {
  downloadTorrent,
  refresh,
  resetStateTorrents,
} from "../store/actions/torrent";

import { Spinner } from "../components/Spinner";
import { IMG_API_HIGH, NO_IMAGE } from "../globalVariables";

export const SerialItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedOptionSubtlite, setSelectedOptionSubtlite] = useState(null);
  const [selectedOptionTorrent, setSelectedOptionTorrent] = useState(null);
  const [torrentsList, setTorrentsList] = useState(null);
  const [subtitlesList, setSubtitlesList] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const serialItem = useSelector((state) => state.serialItem);
  const { loading, serial } = serialItem;
  const { name, poster_path, first_air_date, vote_average, overview, genres } =
    serial;
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

  const onChangeTorrent = (e) => {
    setSelectedOptionTorrent(e);
  };

  const onChangeSubtitle = (e) => {
    setSelectedOptionSubtlite(e);
  };

  const onDownload = () => {
    dispatch(downloadTorrent(selectedOptionTorrent, subtitlesList, serial));
  };

  const onrefresh = () => {
    dispatch(refresh());
  };

  useEffect(() => {
    dispatch(getSerial(Number(id)));
  }, [dispatch, id]);

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
            <div className="select">
              <div className="button-play" style={{ paddingTop: "20px" }}>
                {
                  <button
                    disabled={loadingTorrents || loadingSubtitles}
                    style={{ width: "100px", height: "40px" }}
                    onClick={onDownload}
                  >
                    Download
                  </button>
                }
              </div>
              <div className="button-play">
                {
                  <button
                    style={{ width: "100px", height: "40px" }}
                    onClick={onrefresh}
                  >
                    Refresh library
                  </button>
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
      )}
    </div>
  );
};
