import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      console.log(data.foodPartner.foodItem);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="h-auto w-full">
      {/* Profile Header */}
      <div className="h-54 w-full bg-gray-400 flex flex-col justify-center px-6 sticky top-0 left-0 z-10">
        <div className="flex items-center gap-8">
          <div className="w-34 h-34 rounded-full bg-gray-200 flex justify-center items-center">
            <img
              className="w-32 h-32 rounded-full "
              src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile.jpg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-blue-900 text-xl">
              {profile.name}
            </div>
            <div className="text-md text-blue-600">{profile.address}</div>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <p className="text-lg text-blue-900">Total meals</p>
          <p className="text-lg text-blue-900">Customer services</p>
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
