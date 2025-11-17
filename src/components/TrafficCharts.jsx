import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrafficCharts = ({ data }) => {
  const { totalCounts, rates } = data;

  const pieData = [
    { name: '2-Wheeler', value: totalCounts['2WHLR'], color: '#3b82f6' },
    { name: 'Light Motor', value: totalCounts.LMV, color: '#10b981' },
    { name: 'Heavy Motor', value: totalCounts.HMV, color: '#ef4444' },
  ];

  const barData = [
    { type: '2WHLR', rate: rates['2WHLR'] },
    { type: 'LMV', rate: rates.LMV },
    { type: 'HMV', rate: rates.HMV },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Vehicle Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Traffic Rate (per minute)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rate" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficCharts;
