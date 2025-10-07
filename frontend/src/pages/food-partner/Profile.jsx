import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getFoodPartnerById();
  }, [id]);

  const getFoodPartnerById = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/food-partner/${id}`,
        { withCredentials: true }
      );
      setProfile(data.foodPartner);
      setVideos(data.foodPartner.foodItem || []);
      // console.log(data.foodPartner.foodItem);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="h-auto w-full">
      {/* Profile Header */}
      <div className="h-34 w-full bg-blue-950 flex justify-center items-center px-6 sticky top-0 left-0 z-10">
        <div className="flex w-[98%] h-[95%] items-center">
          <div className="w-1/2 h-full flex justify-start items-center gap-8">
            <img
              className="size-24 rounded-full"
              src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile.jpg"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-white text-xl">{profile.name}</p>
              <p className="text-sm text-white">{profile.address}</p>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-end items-start relative group">
            <div className="bg-yellow-400">
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
            </div>
            <div className="h-8 w-20 bg-white absolute top-8 right-0 hidden group-hover:block rounded-md">
              <p className="text-center cursor-pointer pt-10">Logout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="bg-white h-full w-full p-4 rounded-lg flex justify-center mt-80">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%]">
          {videos.length > 0 ? (
            videos.map((item, index) => (
              <div
                key={index}
                className="h-[500px] bg-white rounded-lg shadow flex items-center justify-center overflow-hidden"
              >
                <video
                  src={item.video}
                  controls
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-700">
              No videos uploaded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
