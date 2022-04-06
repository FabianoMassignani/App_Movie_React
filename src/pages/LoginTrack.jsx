import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";

import { login, Checkin, history, DeviceCode } from "../store/actions/trakt";

export const LoginTrack = () => {
  const dispatch = useDispatch();

  const trakt = useSelector((state) => state.traktUser);
  const { loading, auth } = trakt;
  const { expires_in, interval, user_code, verification_url } = auth;

  useEffect(() => {
    dispatch(DeviceCode());
    if (user_code && interval) {
      // dispatch(GetToken(user_code));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            Go to {verification_url} and use the code {user_code}
          </div>
        </div>
      )}
    </div>
  );
};
