import React from "react";

const Main = () => {
  const videoUrl = "https://ik.imagekit.io/3a0xukows/sunflower.mp4?updatedAt=1734533963762";

  return (
    <video
      src={videoUrl}
      autoPlay
      loop
      muted
      plays-inline
      className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
    ></video>
  );
};

export default Main;
