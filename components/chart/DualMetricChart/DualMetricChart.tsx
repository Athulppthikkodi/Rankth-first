import React from "react";
import styled from "@emotion/styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Typography from "@/components/DataDisplay/Typography/Typography";

// Define the data structure
interface DataPoint {
  date: string;
  clicks: number;
  impressions: number;
}

// Emotion styled components
const ChartContainer = styled.div`
  background-color: #F0F7F7;
  border-radius: 8px;
  padding: 16px;
  height: 150px;
  width: 100%;
  max-width: 308px;
`;

const LegendContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 8px;
`;

const DualMetricChart: React.FC = () => {
  // Sample data - replace with your actual data
  const data: DataPoint[] = [
    { date: "01/01", clicks: 120, impressions: 100 },
    { date: "02/01", clicks: 180, impressions: 130 },
    { date: "03/01", clicks: 200, impressions: 200 },
    { date: "04/01", clicks: 150, impressions: 230 },
    { date: "05/01", clicks: 80, impressions: 190 },
    { date: "06/01", clicks: 70, impressions: 120 },
    { date: "07/01", clicks: 120, impressions: 90 },
    { date: "08/01", clicks: 130, impressions: 100 },
    { date: "09/01", clicks: 100, impressions: 140 },
    { date: "10/01", clicks: 90, impressions: 190 },
    { date: "11/01", clicks: 200, impressions: 210 },
    { date: "12/01", clicks: 150, impressions: 170 },
  ];

  // Reference line position (adjust as needed)
  const referenceLineX = "10/01";

  // Colors for the chart
  const colors = {
    click: "#36D399",
    impression: "#3B82F6",
    referenceLine: "#FF4A4A",
  };

  return (
    <ChartContainer>
      <LegendContainer>
        <LegendItem>
          <LegendDot color={colors.click} />
          <Typography
            variant="caption"
            component="span"
            sx={{ fontSize: "12px", fontWeight: 400 }}
          >
            Clicks
          </Typography>
        </LegendItem>
        <LegendItem>
          <LegendDot color={colors.impression} />
          <Typography
            variant="caption"
            component="span"
            sx={{ fontSize: "12px", fontWeight: 400 }}
          >
            Impression
          </Typography>
        </LegendItem>
      </LegendContainer>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
          {/* <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888', fontSize: 11 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888', fontSize: 11 }} 
            width={30}
          /> */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke={colors.click}
            name="Click"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: colors.click }}
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke={colors.impression}
            name="Impression"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: colors.impression }}
          />
          <ReferenceLine
            x={referenceLineX}
            stroke={colors.referenceLine}
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DualMetricChart;
