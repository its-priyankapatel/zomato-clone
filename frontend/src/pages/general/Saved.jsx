import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";
import { RiHomeLine } from "react-icons/ri";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { PiBookmarkSimple } from "react-icons/pi";

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const fetchSaved = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/food/get/saved-video",
        {
          withCredentials: true,
        }
      );
      console.log(data.savedFood);
      setSavedVideos(data.savedFood || []);
    } catch (error) {
      console.log("Error in get saved videos");
    }
  };

  const handleUnSaveVideo = async (foodId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/food/delete-saved/${foodId}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setSavedVideos((prev) => prev.filter((v) => v._id !== foodId));
    } catch (error) {
      console.log("Error in delete saved video");
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        const rect = video.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.bottom <= window.innerHeight + 200;
        if (inView) video.play().catch(() => {});
        else video.pause();
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
        {savedVideos.map((item, index) => (
          <section
            key={index}
            className="h-screen flex flex-col  items-center snap-start bg-gray-300"
          >
            <div className="relative h-[93%] w-full max-w-md max-h-screen">
              <video
                ref={(el) => {
                  if (el) {
                    videoRefs.current[index] = el;
                    el.oncanplay = () => el.play().catch(() => {});
                  }
                }}
                src={item.video}
                className="h-full w-full object-cover rounded-sm"
                muted
                loop
                playsInline
                preload="meta-data"
              />

              {/* Right side actions (only save + comments) */}
              <div className="absolute right-3 bottom-28 flex flex-col items-center gap-6 text-white">
                <div className="flex flex-col items-center gap-1">
                  {savedVideos.some((v) => v._id === item._id) ? (
                    <PiBookmarkSimpleFill
                      className="text-3xl cursor-pointer"
                      onClick={() => handleUnSaveVideo(item._id)}
                    />
                  ) : (
                    <PiBookmarkSimple
                      className="text-3xl cursor-pointer"
                      onClick={() => handleUnSaveVideo(item._id)}
                    />
                  )}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FaCommentDots className="text-2xl cursor-pointer" />
                  <span className="text-xs">{item.comments?.length || 0}</span>
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-5 left-5 text-white flex flex-col gap-1">
                <h2 className="text-md text-black">{item.description}</h2>
                <button
                  onClick={() => navigate(`/food-partner/${item.foodPartner}`)}
                  className="mt-2 h-7 w-18 bg-gray-200 text-blue-950 text-bold rounded-sm text-xs cursor-pointer border-2 border-blue-950 hover:bg-gray-400 hover:text-white"
                >
                  Visit store
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="fixed bottom-0 left-133 h-14 w-[29.5%] bg-blue-950 flex justify-around items-center text-white rounded-xs z-20">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <RiHomeLine className="text-xl" />
          <span className="text-xs">Home</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/saved")}
        >
          <IoBookmarkOutline className="text-xl" />
          <span className="text-xs">Saved</span>
        </div>
      </div>
    </>
  );
};

export default Saved;
