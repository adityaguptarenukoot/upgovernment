export const generateMockData = () => ({
  totalCounts: {
    '2WHLR': Math.floor(Math.random() * 10),
    'LMV': Math.floor(Math.random() * 8),
    'HMV': Math.floor(Math.random() * 5),
  },
  inLane: {
    '2WHLR': Math.floor(Math.random() * 12),
    'LMV': Math.floor(Math.random() * 10),
    'HMV': Math.floor(Math.random() * 15),
  },
  outLane: {
    '2WHLR': Math.floor(Math.random() * 8),
    'LMV': Math.floor(Math.random() * 6),
    'HMV': Math.floor(Math.random() * 3),
  },
  thresholds: {
    '2WHLR': 1,
    'LMV': 50,
    'HMV': 1,
  },
  rates: {
    '2WHLR': Math.floor(Math.random() * 6),
    'LMV': Math.floor(Math.random() * 5),
    'HMV': Math.floor(Math.random() * 4),
  },
});
