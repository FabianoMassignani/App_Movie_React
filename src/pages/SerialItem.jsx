import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSerial } from "../store/actions/serialActions";
import Moment from "react-moment";
import Select from "react-select";

 import { startTorrent } from "../store/actions/torrentActions";
 import { stopTorrent } from "../store/actions/torrentActions";

import { Spinner } from "../components/Spinner";
import { IMG_API_HIGH, NO_IMAGE } from "../globalVariables";

export const SerialItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedOptionSubtlite, setSelectedOptionSubtlite] = useState(null);
  const [selectedOptionTorrent, setSelectedOptionTorrent] = useState(null);
  const [torrentsList, setTorrentsList] = useState(null);
  const [subtitlesList, setSubtitlesList] = useState(null);
  const [play, setPlay] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const serialItem = useSelector((state) => state.serialItem);
  const { loading, serial } = serialItem;
  const { name, poster_path, first_air_date, vote_average, overview, genres } =
    serial;

  const torrentList = useSelector((state) => state.torrentList);
  const { torrents, loadingTorrents } = torrentList;
  const subtitleList = useSelector((state) => state.subtitleList);
  const { subtitles, loadingSubtitles } = subtitleList;

  const onChangeTorrent = (e) => {
    setSelectedOptionTorrent(e);
    pararPlayer();
  };

  const onPlay = () => {
    dispatch(startTorrent(selectedOptionTorrent, setPlay));
  };

  const pararPlayer = () => {
     dispatch(stopTorrent());
    setPlay(false);
  };

  useEffect(() => {
    dispatch(getSerial(Number(id)));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  return (
    <div className="Item">
      <div className="Details-window">
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

            <div className={`overview`}>
              <div
                onMouseOver={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                {!isShown && <p>{overview?.substring(0, 135)}...</p>}
                {isShown && <p>{overview}</p>}
              </div>
            </div>

            <div className="select" style={{ display: "flex" }}>
              <div className="button-play"></div>
              <div className="Select-torrent">
                <Select
                  width="300px"
                  value={selectedOptionTorrent}
                  isSearchable={false}
                  isLoading={loadingTorrents}
                  onChange={(e) => onChangeTorrent(e)}
                  options={torrentsList ? torrentsList : []}
                />
              </div>
              <div className="Select-subtitles">
                <Select
                  width="300px"
                  value={selectedOptionSubtlite}
                  isSearchable={false}
                  isLoading={loadingSubtitles}
                  onChange={setSelectedOptionSubtlite}
                  options={subtitlesList ? subtitlesList : []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Player"></div>
    </div>
  );
};
