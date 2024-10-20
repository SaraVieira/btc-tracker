"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  price: {
    label: "Price",
    color: "#2563eb",
  },
} satisfies ChartConfig;
export const PriceChart = ({
  historical,
}: {
  historical: { date: number; price: number }[];
}) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={historical}>
        <XAxis
          dataKey="date"
          tick={false}
          tickFormatter={(value) =>
            `${new Date(value).getHours()}:${new Date(value).getMinutes()}`
          }
        />
        <YAxis
          dataKey="price"
          domain={[
            Math.min(...historical.map((h) => h.price)) - 200,
            Math.max(...historical.map((h) => h.price)) + 200,
          ]}
          allowDataOverflow
          tickFormatter={(value) => value + "$"}
        />
        <CartesianGrid vertical={false} />
        <ChartTooltip
          content={({ payload }) => {
            if (!payload?.length) {
              return null;
            }
            return (
              <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                <div className="font-medium">Price</div>
                <div className="grid gap-1.5">
                  <div className="flex w-full flex-wrap gap-2 [&amp;>svg]:h-2.5 [&amp;>svg]:w-2.5 [&amp;>svg]:text-muted-foreground items-center flex-col">
                    {Object.keys(payload[0].payload).map((key) => (
                      <div className="flex flex-wrap gap-2">
                        <div
                          className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5"
                          style={{
                            "--color-bg": " var(--color-price)",
                            "--color-border": " var(--color-price)",
                          }}
                        ></div>{" "}
                        <div className="flex flex-1 justify-between leading-none items-center">
                          <div className="grid gap-1.5">
                            <span className="text-muted-foreground capitalize">
                              {key}
                            </span>
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
  );
};
