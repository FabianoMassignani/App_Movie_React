import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoJS.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;


  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        id="player"
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      >
        {/* <track
          key={subtitles.id}
          src={subtitles.url}
          kind="subtitles"
          srcLang={subtitles.language}
          label={subtitles.label}
          default={subtitles.language === defaultSubtitle}
        /> */}
      </video>
    </div>
  );
};

export default VideoJS;
