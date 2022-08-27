import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../components/Spinner";

import { Checkin, history, login, logout } from "../store/actions/trakt";

export const LoginTrack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Trakt = useSelector((state) => state.TraktAuth);
  const { loading, token, trakt, tokenLoading } = Trakt;

  useEffect(() => {
    if (!token) {
      dispatch(login(goTo));
    } else {
      dispatch(logout(goTo));
    }
  }, [dispatch]);

  const goTo = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="login">
          <p>Go to {trakt?.verification_url} and use the code bellow</p>
          <h2>{trakt?.user_code}</h2>
        </div>
      )}
    </div>
  );
};
