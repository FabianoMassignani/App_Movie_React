import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Searchbox } from "../components/Searchbox";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";
import { SelectsFilters } from "../components/SelectsFilters";
import { addSerials, getSerials } from "../store/actions/serial";
// import { stopTorrent } from "../store/actions/torrent";

export const SerialList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [dataLength, setDataLength] = useState(30);
  const [hasMore, setHasMore] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const Filters = useSelector((state) => state.filters);
  const serialList = useSelector((state) => state.serialList);
  const { filters, ordem } = Filters;
  const { loading, serials, query, results, pages } = serialList;

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
    if (!serials.length > 0) dispatch(getSerials());
  }, [dispatch]);

  const fetchNextPage = () => {
    if (!query) {
      dispatch(addSerials(page));
      setPage(page + 1);
      setDataLength(dataLength + 20);
      if (page === pages) {
        setHasMore(false);
      }
    }
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="container">
        <Navbar />

        <div className="menu">
          <div className="searchbox">
            <Searchbox serials />
          </div>
          <div className="filter">
            <Button handleFilter={handleFilter} showFilter={showFilter} />
          </div>
        </div>

        <SelectsFilters showFilter={showFilter} page={page} setPage={setPage} />

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
      </div>
    </>
  );
};
