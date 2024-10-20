"use client";

import { formatAMPM } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef } from "react";
import { useNow } from "@/lib/useNow";

export const Betting = ({ price }: { price: { usd: number } }) => {
  const now = useNow(300);
  console.log(now);
  return (
    <section className="grid sm:grid-cols-2 gap-4 items-center justify-center sm:justify-normal">
      <div>
        <Button size="lg" className="rounded-r-none" variant={"success"}>
          <ArrowUp />
        </Button>
        <Button size="lg" className="rounded-l-none" variant={"destructive"}>
          <ArrowDown />
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <span className="text-muted-foreground">Current price:</span> $
          {price.usd}
        </li>
        <li>
          <span className="text-muted-foreground">Current time:</span>{" "}
          {formatAMPM(now, true)}
        </li>
      </ul>
    </section>
  );
};
