import React, { useEffect, useState } from "react";
import VideoJS from "./VideoJS";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import { stopTorrent } from "../store/actions/torrent";
import { HOST_API } from "../globalVariables";
import { HOST_API2 } from "../globalVariables";

export const Player = () => {
  const playerRef = React.useRef(null);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [socketState, setSocket] = useState("");
  const [novo, setNovo] = useState("");

  const { subtitle, playing, time } = response;

  useEffect(() => {
    const socket = socketIOClient(HOST_API2);
    setSocket(socket);

    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (subtitle && player) {
      if (novo !== subtitle.id) {
        setNovo(subtitle.id);

        var oldTracks = player.remoteTextTracks();
        var i = oldTracks.length;
        while (i--) {
          player.removeRemoteTextTrack(oldTracks[i]);
        }

        player.addRemoteTextTrack(
          {
            key: subtitle.id,
            kind: "subtitles",
            src: subtitle.url,
            mode: "showing",
            srcLang: subtitle.language,
            label: subtitle.filename,
            default: subtitle.language,
          },
          false
        );
      }
    }
  }, [subtitle]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        type: "video/mp4",
        src: `${HOST_API}/video`,
      },
    ],
  };

  const addOffset = (offset) => {
    const Player = playerRef.current;
    if (Player) {
      Array.from(Player.player.textTracks_.tracks_).forEach((track) => {
        if (track.mode === "showing") {
          Array.from(track.cues).forEach((cue) => {
            cue.startTime += offset || 0.5;
            cue.endTime += offset || 0.5;
          });
          return true;
        }
      });
    }
    return false;
  };

  const removeOffset = (videoId, offset) => {
    const Player = playerRef.current;
    if (Player) {
      Array.from(Player.player.textTracks_.tracks_).forEach((track) => {
        if (track.mode === "showing") {
          Array.from(track.cues).forEach((cue) => {
            cue.startTime -= offset || 0.5;
            cue.endTime -= offset || 0.5;
          });
          return true;
        }
      });
    }
    return false;
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    let currentTime = 0;
    let minutes = 0;
    let timeUpdate = 0;

    player.ready(function () {
      var settings = this.textTrackSettings;
      settings.setValues({
        backgroundColor: "#000",
        backgroundOpacity: "0",
        edgeStyle: "uniform",
        color: "#FF0",
      });

      //https://github.com/videojs/video.js/blob/master/src/js/tracks/text-track-settings.js#L63

      settings.updateDisplay();
    });

    player.on("canplay", () => {
      console.log("Video canplay");
    });

    player.on("loadeddata", () => {
      console.log("Video loadeddata");

      // player.currentTime(props.time);
    });

    player.on("playing", () => {
      console.log("Video playing");

      // const FullscreenInterval = setInterval(function () {
      //   try {
      //     if (player.isFullscreen_) {
      //       clearInterval(FullscreenInterval);
      //     } else {
      //       player.requestFullscreen();
      //     }
      //   } catch (error) {
      //     console.log("Tentando Fullscreen");
      //   }
      // }, 2000);
    });

    player.on("play", () => {
      currentTime = player.currentTime();
      timeUpdate = currentTime;
      minutes = Math.floor(currentTime / 60);
      console.log("Video played at: ", minutes);
      socketState.emit("playerTime", player.currentTime());
    });

    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });

    player.on("pause", () => {
      console.log("Video pause");
    });

    player.on("timeupdate", (e) => {
      currentTime = player.currentTime();
      minutes = Math.floor(currentTime / 60);
      console.log("Video time: ", minutes);

      if (currentTime > timeUpdate) {
        timeUpdate = currentTime + 20;
        socketState.emit("playerTime", player.currentTime());
      }
    });

    player.on("ended", () => {
      console.log("Video ended");
    });

    player.on("error", () => {
      console.log("Player error");
      if (player) player.dispose();
      dispatch(stopTorrent());
    });
  };

  return (
    <div className="container-player">
      <div className="status">
        {time ? (
          <p>
            <time dateTime={time}>{time}</time>
          </p>
        ) : (
          <p>Server off</p>
        )}
      </div>
      {playing ? (
        <div className="video">
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      ) : (
        <div className="message">
          <h1> Escolha um filme ou Tv show</h1>
        </div>
      )}
    </div>
  );
};
