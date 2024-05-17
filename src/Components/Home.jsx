import React, { useEffect, useState, useRef } from "react";
import ProfileInfo from "./ProfileInfo";
import Header from "./Header";
import Demo from "./Demo";
import Icons from "./Icons";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(null); // State to handle camera errors
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to start the camera when the component mounts
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
        } else {
          console.error("Video element reference is null.");
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError(err.message); // Set camera error message if access is denied
      }
    };

    // Call the function to start the camera when the component mounts
    startCamera();

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Event handler for button click
  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <>
      {isClicked ? (
        <div>
          {isLoading ? (
            <div className="loading-spinner">
              <HashLoader color={"#3E3E3E"} size={50} />
            </div>
          ) : (
            <>
              {cameraError ? (
                <div className="error-message">{cameraError}</div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-background"
                  />
                  <Header />
                  <ProfileInfo />
                  <Demo />
                  <Icons />
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-background"
          />
          <Header />
          <div className="home-container">
            <button
              className="home-btn"
              onClick={handleClick}
            >
              Click
            </button>
          </div>
          <div className="footer">
            <h6>tap the screen</h6>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
