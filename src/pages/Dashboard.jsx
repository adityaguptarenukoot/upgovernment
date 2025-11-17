import { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { generateMockData } from '../mockData';

function Dashboard() {
  const [videoFile, setVideoFile] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [trafficData, setTrafficData] = useState(generateMockData());
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTrafficData(generateMockData());
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isStarted]);

  useEffect(() => {
    if (videoFile && videoRef.current) {
      const url = URL.createObjectURL(videoFile);
      videoRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  useEffect(() => {
    if (isStarted && canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      const drawLabels = () => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(20, 20, 120, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('OUT LANE', 30, 48);
        
        ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
        ctx.fillRect(width - 140, 20, 120, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('IN LANE', width - 130, 48);
      };
      
      const interval = setInterval(drawLabels, 100);
      return () => clearInterval(interval);
    }
  }, [isStarted]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setIsStarted(false);
    }
  };

  const handleStart = () => {
    if (videoFile) {
      setIsStarted(prev => !prev);
    } else {
      alert('Please upload a video or image first!');
    }
  };

  const { totalCounts, inLane, outLane, rates } = trafficData;

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  const totalPieData = [
    { name: '2-Wheeler', value: totalCounts['2WHLR'], color: '#3b82f6' },
    { name: 'LMV', value: totalCounts.LMV, color: '#10b981' },
    { name: 'HMV', value: totalCounts.HMV, color: '#ef4444' },
  ];

  const inLanePieData = [
    { name: '2-Wheeler', value: inLane['2WHLR'], color: '#3b82f6' },
    { name: 'LMV', value: inLane.LMV, color: '#10b981' },
    { name: 'HMV', value: inLane.HMV, color: '#ef4444' },
  ];

  const outLanePieData = [
    { name: '2-Wheeler', value: outLane['2WHLR'], color: '#3b82f6' },
    { name: 'LMV', value: outLane.LMV, color: '#10b981' },
    { name: 'HMV', value: outLane.HMV, color: '#ef4444' },
  ];

  const barData = [
    { type: '2WHLR', rate: rates['2WHLR'] },
    { type: 'LMV', rate: rates.LMV },
    { type: 'HMV', rate: rates.HMV },
  ];

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-hidden">
      <div className="h-full flex flex-col gap-4">
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload
          </button>
          <button
            onClick={handleStart}
            className={`px-6 py-2 rounded font-semibold ${
              isStarted ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {isStarted ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded border border-gray-300 relative">
            {videoFile ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded"
                  autoPlay
                  loop
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                  width={1280}
                  height={720}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Upload a video or image to start
              </div>
            )}
          </div>

          <div className="grid grid-rows-4 gap-4">
            <div className="bg-white rounded border border-gray-300 p-3">
              <h3 className="text-gray-800 text-sm font-semibold mb-1">Total Vehicles</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={totalPieData}
                    cx="40%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={renderCustomLabel}
                    labelLine={false}
                    isAnimationActive={false}
                  >
                    {totalPieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle" 
                    iconSize={10}
                    wrapperStyle={{ fontSize: '15px', paddingLeft: '0px', paddingRight: '5px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded border border-gray-300 p-3">
              <h3 className="text-gray-800 text-sm font-semibold mb-1">IN Lane</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={inLanePieData}
                    cx="40%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={renderCustomLabel}
                    labelLine={false}
                    isAnimationActive={false}
                  >
                    {inLanePieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle" 
                    iconSize={10}
                    wrapperStyle={{ fontSize: '15px', paddingLeft: '5px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded border border-gray-300 p-3">
              <h3 className="text-gray-800 text-sm font-semibold mb-1">OUT Lane</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={outLanePieData}
                    cx="40%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={renderCustomLabel}
                    labelLine={false}
                    isAnimationActive={false}
                  >
                    {outLanePieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle" 
                    iconSize={10}
                    wrapperStyle={{ fontSize: '15px', paddingLeft: '5px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded border border-gray-300 p-3">
              <h3 className="text-gray-800 text-sm font-semibold mb-1">Traffic Rate/Min</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={barData}>
                  <XAxis dataKey="type" stroke="#374151" style={{ fontSize: '10px' }} />
                  <YAxis stroke="#374151" style={{ fontSize: '10px' }} />
                  <Bar dataKey="rate" fill="#8b5cf6" isAnimationActive={false} />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="square" 
                    iconSize={10}
                    wrapperStyle={{ fontSize: '15px', paddingLeft: '5px' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
