import axios from "axios";
import React, { useState } from "react";

const CreateFood = () => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFoodSubmit = async () => {
    const formData = new FormData();
    formData.append("name", foodName);
    formData.append("description", description);
    formData.append("file", videoFile);

    const { data } = await axios.post(
      "http://localhost:3000/api/food/",
      formData,
      { withCredentials: true }
    );
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-3">
          Create Food
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Upload a short video, give it a name, and add a description
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Drag & Drop / File Upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-all">
            {preview ? (
              <video
                src={preview}
                className="h-40 w-full object-cover rounded-lg"
                controls
              />
            ) : (
              <p className="text-gray-400 text-center">
                Click or drag a video here
              </p>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Food Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Enter food name"
              className="h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="h-28 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleFoodSubmit}
            className="mt-4  h-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white py-3 rounded-xl font-semibold hover:from-blue-800 hover:to-blue-950 transition-all shadow-lg"
          >
            Upload Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
