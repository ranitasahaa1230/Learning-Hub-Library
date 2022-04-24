import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdOutlineWatchLater, MdThumbUp, MdPlaylistAdd } from "react-icons/md";
import "./VideoCard.css";
import { useAuth, useVideos } from "../../contexts";
import { isInWatchLaterVideo } from "../../utlities";
import { addToWatchLater, removeFromWatchLater } from "../../services";
import { useToast } from "../../hooks";

export const VideoCard = ({ video }) => {
  const { _id, title, creator, uploaded, thumbnail, views, time } = video;
  const navigate = useNavigate();
  const [displayOptions, setDisplayOptions] = useState(false);
  const { showToast } = useToast();
  const {
    videoState: { watchLater },
    videoDispatch,
  } = useVideos();

  const {
    state: { user },
  } = useAuth();

  const videoInWatchLater = isInWatchLaterVideo(watchLater, _id);

  const handleDisplayOptions = () => {
    if(!user){
      navigate('/login');
    }else{
    setDisplayOptions(true);
    }
  };

  const deleteIcon=()=>{
    setDisplayOptions(false);
  }

  const handleWatchLater = () => {
    if (!user) {
      navigate("/login");
    } else {
      if (!videoInWatchLater) {
        addToWatchLater(video, videoDispatch, showToast);
      } else {
        removeFromWatchLater(_id, videoDispatch, showToast);
      }
    }
  };

  const handleAddToPlaylist=()=>{
    // handleShowModal(true);
    // setShowOptions(false);
    // setClickedVideo(video);
    setDisplayOptions(false);
  }

  return (
    <div className="video" key={_id}>
      <div className="video__top" onClick={() => navigate(`/video/${_id}`)}>
        <img src={`https://i.ytimg.com/vi/${_id}/0.jpg`} alt="video-logo" />
        <span className="video__top__duration">{time}</span>
      </div>
      <div className="video__channel">
        <img src={thumbnail} alt="video-thumbnail" />
        <div className="bold__text">{title}</div>

        <div className="ellipsis" onClick={handleDisplayOptions}>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>

        {displayOptions && (
          <div className="display__options">
            <div className="flex__display__options">
              <div>
                <li className="options__li" onClick={handleWatchLater}>
                  <MdOutlineWatchLater size={25} />
                  <span className="video__space">
                    {videoInWatchLater ? "Will Watch Later" : "Watch Later"}
                  </span>{" "}
                </li>
                <li className="options__li" onClick={handleAddToPlaylist}>
                  <MdPlaylistAdd size={25} />
                  <span className="video__space">Add To Playlist</span>
                </li>
              </div>
              <span className="delete__option" onClick={deleteIcon}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
        )}
      </div>

      <h3 className="video__title">{creator}</h3>
      <div className="video__details">
        <span>
          <b>
            <AiFillEye size={18} />{" "}
          </b>{" "}
          {views} views{" "}
        </span>{" "}
        <span>
          <b>•</b> {uploaded}
        </span>
      </div>
    </div>
  );
};
