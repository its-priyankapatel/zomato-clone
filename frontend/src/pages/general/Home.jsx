import axios from "axios";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/food/", {
        withCredentials: true,
      });
      setVideos(data.foodItems);
      console.log(data.foodItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;

        const rect = video.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.bottom <= window.innerHeight + 200; // check if in viewport

        if (inView) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
        {videos.map((item, index) => (
          <section
            key={index}
            className="h-screen flex justify-center items-center snap-start bg-black"
          >
            <div className="relative h-full w-full max-w-md">
              {/* Video */}
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

              {/* Overlay content (like description + button) */}
              <div className="absolute bottom-8 left-5 text-white">
                <h2 className="text-lg font-bold text-gray-500">
                  {item.description}
                </h2>
                <button
                  onClick={() => navigate(`/food-partner/${item.foodPartner}`)}
                  className="mt-4 h-7 w-20 bg-blue-900 rounded-sm text-sm cursor-pointer"
                >
                  Visit store
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Home;
