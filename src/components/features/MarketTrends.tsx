
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MarketTrendsProps {
  title: string;
  description: string;
  currentValue: number;
  previousValue: number;
  trendData: number[];
}

interface MarketDataItem {
  name: string;
  value: number;
  change: number;
}

const data: MarketDataItem[] = [
  { name: 'Jan', value: 2400, change: 0.02 },
  { name: 'Feb', value: 1398, change: -0.05 },
  { name: 'Mar', value: 9800, change: 0.03 },
  { name: 'Apr', value: 3908, change: 0.01 },
  { name: 'May', value: 4800, change: -0.02 },
  { name: 'Jun', value: 3800, change: 0.04 },
  { name: 'Jul', value: 4300, change: -0.03 },
  { name: 'Aug', value: 2800, change: 0.02 },
  { name: 'Sep', value: 5400, change: 0.01 },
  { name: 'Oct', value: 6700, change: -0.04 },
  { name: 'Nov', value: 4100, change: 0.03 },
  { name: 'Dec', value: 7200, change: -0.01 },
];

const MarketTrends: React.FC<MarketTrendsProps> = ({
  title,
  description,
  currentValue,
  previousValue,
  trendData,
}) => {
  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentageChange > 0;

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-semibold">₹{currentValue.toLocaleString()}</div>
            <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {percentageChange.toFixed(2)}%
            </div>
          </div>
          <div className="w-32 h-12">
            <Sparklines data={trendData}>
              <SparklinesLine color="#4338ca" />
            </Sparklines>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Monthly Trends</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip formatter={(value, name, props) => [`₹${value.toLocaleString()}`, 'Value']} />
              <Legend />
              <Bar
                dataKey="value"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrends;
