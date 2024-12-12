'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ClimateGraphData {
  Month: string;
  rainfall_mm: number;
  max_temp_celsius: number;
  min_temp_celsius: number;
  frost_days: number;
}

export interface ClimateChartProps {
  data: ClimateGraphData[];
  chartType: 'area' | 'bar' | 'line';
  dataKey?: Exclude<keyof ClimateGraphData, 'Month'>;
  dataKeys?: Exclude<keyof ClimateGraphData, 'Month'>[];
  fill: string | string[];
  stroke: string | string[];
  yAxisLabel: string;
}

const ClimateChart = ({
  data,
  chartType,
  dataKey,
  dataKeys,
  fill,
  stroke,
  yAxisLabel,
}: ClimateChartProps) => {
  const getFill = (index: number) => (Array.isArray(fill) ? fill[index] : fill);
  const getStroke = (index: number) =>
    Array.isArray(stroke) ? stroke[index] : stroke;

  const renderChart = () => {
    switch (chartType) {
      // Area chart
      case 'area':
        if (!dataKey)
          return (
            <span className="text-center">
              Data key not provided for area chart
            </span>
          );
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month">
              <Label className="text-sm" dy={15} value="Month" />
            </XAxis>
            <YAxis>
              <Label
                className="text-xs"
                angle={270}
                dx={-15}
                value={yAxisLabel}
              />
            </YAxis>
            <Tooltip />
            <Area
              dataKey={dataKey}
              fill={getFill(0)}
              stroke={getStroke(0)}
              type="monotone"
            />
          </AreaChart>
        );
      // Bar chart
      case 'bar':
        if (!dataKey)
          return (
            <span className="text-center">
              Data key not provided for bar chart
            </span>
          );
        return (
          <BarChart data={data}>
            <XAxis dataKey="Month">
              <Label className="text-sm" dy={15} value="Month" />
            </XAxis>
            <YAxis>
              <Label
                className="text-xs"
                angle={270}
                dx={-15}
                value={yAxisLabel}
              />
            </YAxis>
            <Tooltip />
            <Bar dataKey={dataKey} fill={getFill(0)} stroke={getStroke(0)} />
          </BarChart>
        );
      // Stacked area chart
      case 'line':
        if (!dataKeys || dataKeys.length === 0)
          return (
            <span className="text-center">
              Data keys not provided for stacked area chart.
            </span>
          );
        return (
          <LineChart data={data}>
            <XAxis dataKey="Month">
              <Label className="text-sm" dy={15} value="Month" />
            </XAxis>
            <YAxis>
              <Label
                className="text-xs"
                angle={270}
                dx={-15}
                value={yAxisLabel}
              />
            </YAxis>
            <Tooltip />
            {dataKeys?.map((key, index) => (
              <Line
                key={key}
                dataKey={key}
                stroke={getStroke(index)}
                strokeWidth={2}
                type="monotone"
              />
            ))}
          </LineChart>
        );
      // Default
      default:
        return <></>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  );
};

interface ClimateGraphsProps {
  climateGraphData: ClimateGraphData[];
}

const ClimateGraphs = ({ climateGraphData }: ClimateGraphsProps) => {
  return (
    <Tabs
      className="flex min-w-[300px] flex-1 flex-col rounded-lg border shadow-lg"
      defaultValue="rainfall"
    >
      <TabsList className="rounded-b-none rounded-t-lg bg-primary text-white">
        <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
        <TabsTrigger value="temperature">Temperature</TabsTrigger>
        <TabsTrigger value="forst">Frost</TabsTrigger>
      </TabsList>
      <TabsContent value="rainfall" className="flex-1 px-4 py-5">
        <ClimateChart
          data={climateGraphData}
          chartType="area"
          dataKey="rainfall_mm"
          fill="#1e90ff"
          stroke="#1e90ff"
          yAxisLabel="Average Rainfall (mm)"
        />
      </TabsContent>
      <TabsContent value="temperature" className="flex-1 px-4 py-5">
        <ClimateChart
          data={climateGraphData}
          chartType="line"
          dataKeys={['max_temp_celsius', 'min_temp_celsius']}
          fill=""
          stroke={['#d62728', '#3399ff']}
          yAxisLabel="Min and Max Temperature (°C)"
        />
      </TabsContent>
      <TabsContent value="forst" className="flex-1 px-4 py-5">
        <ClimateChart
          data={climateGraphData}
          chartType="bar"
          dataKey="frost_days"
          fill="#00ffff"
          stroke="#00ffff"
          yAxisLabel="Average Frost Days"
        />
      </TabsContent>
    </Tabs>
  );
};

export default ClimateGraphs;
