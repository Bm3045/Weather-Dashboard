import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

const Graph = ({ data, type, title, unit }) => {
  if (!data || data.length === 0) {
    return (
      <div className="graph-container" style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>{title}</h3>
        <p style={{ textAlign: 'center', color: '#999' }}>No data available</p>
      </div>
    );
  }

  const getChartConfig = () => {
    switch(type) {
      case 'temperature':
        return {
          component: LineChart,
          lines: [
            { key: 'temperature', color: CHART_COLORS.temperature, name: 'Temperature' }
          ]
        };
      case 'humidity':
        return {
          component: LineChart,
          lines: [
            { key: 'humidity', color: CHART_COLORS.humidity, name: 'Relative Humidity' }
          ]
        };
      case 'precipitation':
        return {
          component: BarChart,
          bars: [
            { key: 'precipitation', color: CHART_COLORS.precipitation, name: 'Precipitation' }
          ]
        };
      case 'visibility':
        return {
          component: LineChart,
          lines: [
            { key: 'visibility', color: CHART_COLORS.visibility, name: 'Visibility' }
          ]
        };
      case 'wind':
        return {
          component: LineChart,
          lines: [
            { key: 'windSpeed', color: CHART_COLORS.wind, name: 'Wind Speed' }
          ]
        };
      default:
        return {
          component: LineChart,
          lines: []
        };
    }
  };

  const config = getChartConfig();
  const ChartComponent = config.component;

  return (
    <div className="graph-container" style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip />
          <Legend />
          {config.lines && config.lines.map(line => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={false}
            />
          ))}
          {config.bars && config.bars.map(bar => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color}
              name={bar.name}
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;