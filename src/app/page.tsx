"use client"; // Ensure this is a Client Component 
import { useState, useEffect } from "react";
import Head from "next/head";

const keys = [
  { note: "a", type: "white" },
  { note: "w", type: "black" },
  { note: "s", type: "white" },
  { note: "e", type: "black" },
  { note: "d", type: "white" },
  { note: "f", type: "white" },
  { note: "t", type: "black" },
  { note: "g", type: "white" },
  { note: "y", type: "black" },
  { note: "h", type: "white" },
  { note: "u", type: "black" },
  { note: "j", type: "white" },
  { note: "k", type: "white" },
  { note: "o", type: "black" },
  { note: "l", type: "white" },
  { note: "p", type: "black" },
  { note: ";", type: "white" },
];

export default function Home() {
  const [volume, setVolume] = useState(0.5);
  const [showKeys, setShowKeys] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null); // State for active key
  const [isLandscape, setIsLandscape] = useState<boolean>(true); // State for orientation check

  const playTune = (note: string) => {
    const audio = new Audio(`/tunes/${note}.wav`);
    audio.volume = volume;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase(); // Ensure the key is in lowercase
    if (keys.some((k) => k.note === key)) {
      setActiveKey(key); // Set active key for animation
      playTune(key);
      setTimeout(() => setActiveKey(null), 150); // Reset active key after animation
    }
  };

  const handleMouseClick = (note: string) => {
    setActiveKey(note); // Set active key for animation
    playTune(note);
    setTimeout(() => setActiveKey(null), 150); // Reset active key after animation
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [volume]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <Head>
        <title>Keyboard Virtuoso</title>
      </Head>
      <div className="bg-gray-900 text-gray-300 p-8 rounded-lg flex-grow flex flex-col">
        <header className="flex flex-col items-center mb-6">
          <h1 className="custom-title">Keyboard Virtuoso</h1>
          <h2 className="custom-tagline">bring Mozart to life</h2>
        </header>
        {!isLandscape && (
          <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center p-2">
            Please rotate your device to landscape mode for the best experience.
          </div>
        )}
        <div className="controls flex items-center justify-center space-x-8 mb-6">
          <div className="flex items-center">
            <span className="mr-2">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ff7e5f ${volume * 100}%, #ddd ${volume * 100}%)`
              }} 
            />
          </div>

          <div className="flex items-center">
            <span className="mr-4">Show Keys</span>
            <label className="relative inline-flex items-center cursor-pointer ml-2"> {/* Add 'ml-2' for left margin */}
              <input
                type="checkbox"
                checked={showKeys}
                onChange={() => setShowKeys(!showKeys)}
                className="sr-only" 
                id="showKeys"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
              <div className={`absolute w-5 h-5 bg-orange-500 rounded-full transition-transform ${showKeys ? 'transform translate-x-5' : 'translate-x-0'}`}></div>
            </label>
          </div>
        </div>
        <div className="container flex justify-center items-end mb-8"> {/* Add mb-8 for spacing */}
          {keys.map((key) => (
            <div
              key={key.note}
              className={`key ${key.type} ${activeKey === key.note ? 'active' : ''}`}
              onMouseDown={() => handleMouseClick(key.note)}
              onMouseUp={() => setActiveKey(null)}
            >
              {key.note.toUpperCase()}
            </div>
          ))}
        </div>
        
       
       
      </div>
    </div>
  );
}
