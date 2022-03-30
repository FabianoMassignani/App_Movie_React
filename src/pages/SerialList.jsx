import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { Searchbox } from "../components/Searchbox";
import { Spinner } from "../components/Spinner";
import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";
import { SelectsFiltersTV } from "../components/SelectsFiltersTV";
import { getSerials } from "../store/actions/serialActions";
import {
  stopTorrent,
  resetStateTorrents,
} from "../store/actions/torrentActions";
import { resetStateSubtitles } from "../store/actions/subtitlesActions";

export const SerialList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [dataLength, setDataLength] = useState(30);
  const [hasMore, setHasMore] = useState(true);
  const serialList = useSelector((state) => state.serialList);
  const { loading, serials, query, nextLoading, results, pages, currentPage } =
    serialList;

  useEffect(() => {
    dispatch(stopTorrent());
    dispatch(resetStateTorrents());
    dispatch(resetStateSubtitles());
  }, [dispatch]);

  const fetchNextPage = () => {
    if (!query) {
      dispatch(getSerials(page));
      setPage(page + 1);
      setDataLength(dataLength + 30);
      if (page === pages) {
        setHasMore(false);
      }
    }
  };

  return (
    <>
      {/* <SelectsFiltersTV /> */}
      <Searchbox serials />
      {loading && !serials.length > 0 ? (
        <Spinner />
      ) : results !== 0 ? (
        <>
          <InfiniteScrolling
            dataLength={dataLength}
            next={fetchNextPage}
            hasMore={!loading && hasMore}
          >
            <div className="list-container">
              {serials.map(
                (serial) =>
                  serial.poster_path && (
                    <div className="card" key={serial.id}>
                      <Link to={`/serial/${serial.id}`}>
                        <img
                          src={IMG_API_LOW + serial.poster_path}
                          alt={serial.title}
                        />
                        <h3>{serial.name}</h3>
                        <p>
                          <span>{serial.vote_average * 10}% |</span>
                          <span>
                            <Moment format="MMM D, YYYY">
                              {serial.first_air_date}
                            </Moment>
                          </span>
                        </p>
                      </Link>
                    </div>
                  )
              )}
            </div>
          </InfiniteScrolling>
        </>
      ) : (
        <h2 className="py-2 text-center">No TV Show Found</h2>
      )}
    </>
  );
};
