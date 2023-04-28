import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Spinner } from "../../components/Spinner";
import { IMG_API_LOW } from "../../globalVariables";
import { MenuFilters } from "../../components/MenuFilters";
import { getSerials } from "../../store/actions/serial";
import { Navbar } from "../../components/Navbar";

export const SerialList = () => {
  const dispatch = useDispatch();

  const Filters = useSelector((state) => state.filters);
  const serialList = useSelector((state) => state.serialList);
  const { filters, ordem, page } = Filters;
  const { loading, serials, query, results, pages } = serialList;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(getSerials(page, filters, ordem));
  }, [dispatch, page, filters]);

  return (
    <Navbar
      total={pages}
      currentPage={page}
      children={
        <>
          {loading && !serials.length > 0 ? (
            <Spinner />
          ) : results !== 0 ? (
            <>
              <div className="list-container">
                {serials.map(
                  (serial, index) =>
                    serial.poster_path && (
                      <div className="card" key={index}>
                        <Link to={`/serial/${serial.id}`}>
                          <img
                            src={IMG_API_LOW + serial.poster_path}
                            alt={serial.title}
                          />
                          <h3>{serial.title}</h3>
                          <p>
                            <span>{serial.vote_average * 10}% | </span>
                            <span>
                              <Moment format="MMM D, YYYY">
                                {serial.release_date}
                              </Moment>
                            </span>
                          </p>
                        </Link>
                      </div>
                    )
                )}
              </div>
            </>
          ) : (
            <h2 className="py-2 text-center">No TV Show Found</h2>
          )}
        </>
      }
    />
  );
};
