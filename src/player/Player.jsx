import React from "react";
import { useSelector } from "react-redux";
import VideoJS from "./VideoJS"; // point to where the functional component is stored

import { HOST_API } from "../globalVariables";

export const Player = (props) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
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
    subtitles:
      props.subtitles &&
      props.subtitles.map((item, index) => ({
        url: item.url,
        language: item.language + index,
        label: item.label,
      })),
    defaultSubtitle: props.subtitles[0].language + "0",
  };

  const addOffset = (offset) => {
    let Player = document.getElementById("player");
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
    let Player = document.getElementById("player");
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
    let minutes = 0;

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

    player.on("play", () => {
      minutes = Math.floor(player.currentTime() / 60);
      console.log("Video played at: ", minutes);
    });

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });

    player.on("pause", () => {
      console.log("pause");
    });

    player.on("timeupdate", (e) => {
      minutes = Math.floor(player.currentTime() / 60);
      console.log("time: ", minutes);
    });

    player.on("ended", () => {
      console.log("Video ended");
    });

    player.on("error", () => {
      console.log("Video error");
    });
  };

  // const myInterval = setInterval(function () {
  //   let Player = document.getElementsByClassName(
  //     "video-js react-awesome-player"
  //   )[0].player;

  //   if (Player) {
  //     if (Player.isFullscreen_) {
  //       clearInterval(myInterval);
  //     } else {
  //       Player.requestFullscreen();
  //     }
  //   }
  // }, 1000);

  return (
    <div className="fill-window">
      <div className="video">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};
