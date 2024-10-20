"use client";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card } from "./ui/card";

const chartConfig = {
  price: {
    label: "Price",
    color: "#4b78db",
  },
} satisfies ChartConfig;
export const PriceChart = ({
  historical,
}: {
  historical: { time: string; price: number }[];
}) => {
  return (
    <Card className="p-4">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          accessibilityLayer
          data={historical}
        >
          <XAxis dataKey="time" tick={false} hide />
          <YAxis
            dataKey="price"
            domain={[
              Math.min(...historical.map((h) => h.price)) - 200,
              Math.max(...historical.map((h) => h.price)) + 200,
            ]}
            allowDataOverflow
            tick={false}
            hide
          />
          <ChartTooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              return <ChartTooltipContent payload={payload} />;
            }}
          />
          <Line
            dataKey="price"
            stroke="var(--color-price)"
            type="monotone"
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
};

const ChartTooltipContent = ({
  payload,
}: {
  payload: Payload<ValueType, NameType>[];
}) => (
  <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
    <div className="grid gap-1.5">
      <div className="flex w-full flex-wrap gap-2 [&amp;>svg]:h-2.5 [&amp;>svg]:w-2.5 [&amp;>svg]:text-muted-foreground flex-col">
        {Object.keys(payload[0].payload).map((key) => (
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 leading-none items-center justify-start">
              <div className="grid gap-1.5">
                <span className="text-muted-foreground capitalize">{key}</span>
              </div>
              <span className="font-mono font-medium tabular-nums text-foreground pl-1">
                {payload[0].payload[key]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
