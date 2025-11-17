const StatsOverlay = ({ data }) => {
  const { totalCounts, inLane, outLane, thresholds, rates } = data;
  
  const checkThreshold = (type) => {
    return totalCounts[type] > thresholds[type];
  };

  const violations = Object.keys(totalCounts).filter(checkThreshold);

  return (
    <>
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 z-20">
        <div className="text-center">
          <p className="text-lg font-semibold">
            TOTAL COUNT - 2WHLR:{totalCounts['2WHLR']}, LMV:{totalCounts.LMV}, HMV:{totalCounts.HMV}
          </p>
          <p className="text-sm text-gray-600">
            THRESHOLD - 2WHLR:{thresholds['2WHLR']}, LMV:{thresholds.LMV}, HMV:{thresholds.HMV}
          </p>
          <p className="text-sm text-gray-600">
            RATE - 2WHLR/Min:{rates['2WHLR']}, LMV/Min:{rates.LMV}, HMV/Min:{rates.HMV}
          </p>
          {violations.length > 0 && (
            <p className="text-red-600 font-bold text-xl mt-2">
              THRESHOLD CROSSED FOR: {violations.join(' ')}
            </p>
          )}
        </div>
      </div>

      {/* Left Side Panel */}
      <div className="absolute left-0 top-20 bg-white/80 backdrop-blur-sm p-4 z-20 rounded-r-lg">
        <p className="text-green-600 font-bold mb-2">IN</p>
        <div className="text-sm space-y-1">
          <p>LHS COUNT - 2WHLR:{inLane['2WHLR']}, LMV:{inLane.LMV}, HMV:{inLane.HMV}</p>
          <p className="text-red-500">LHS DEFAULTER - 2WHLR:0, LMV:0, HMV:0</p>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="absolute right-0 top-20 bg-white/80 backdrop-blur-sm p-4 z-20 rounded-l-lg">
        <p className="text-red-600 font-bold mb-2">OUT</p>
        <div className="text-sm space-y-1">
          <p>RHS COUNT - 2WHLR:{outLane['2WHLR']}, LMV:{outLane.LMV}, HMV:{outLane.HMV}</p>
          <p className="text-red-500">RHS DEFAULTER - 2WHLR:0, LMV:0, HMV:1</p>
        </div>
      </div>
    </>
  );
};

export default StatsOverlay;
