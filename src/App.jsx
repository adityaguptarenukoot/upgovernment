import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import VideoCanvas from './components/VideoCanvas';
import StatsOverlay from './components/StatsOverlay';
import TrafficCharts from './components/TrafficCharts';
import { generateMockData } from './mockData';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [trafficData, setTrafficData] = useState(generateMockData());

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTrafficData(generateMockData());
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isStarted]);

  const handleFileSelect = (file) => {
    setVideoFile(file);
    setIsStarted(false);
  };

  const handleStart = () => {
    if (videoFile) {
      setIsStarted(prevState => !prevState); // Toggle between true/false
    } else {
      alert('Please upload a video first!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Traffic Monitoring Dashboard
        </h1>

        {!videoFile ? (
          <FileUpload onFileSelect={handleFileSelect} />
        ) : (
          <>
            <div className="mb-6 flex gap-4 justify-center">
              <button
                onClick={() => setVideoFile(null)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Change Video
              </button>
              <button
                onClick={handleStart}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  isStarted
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isStarted ? 'Stop Monitoring' : 'Start Monitoring'}
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl mb-6">
              <div className="relative aspect-video">
                <VideoCanvas videoFile={videoFile} />
                {isStarted && <StatsOverlay data={trafficData} />}
              </div>
            </div>

            {isStarted && <TrafficCharts data={trafficData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
