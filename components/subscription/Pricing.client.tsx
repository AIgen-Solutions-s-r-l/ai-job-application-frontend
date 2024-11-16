"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { PlanType } from "./types";
import { Loader2 } from "lucide-react";

export interface PlanProps {
  loading: boolean;
  type: PlanType;
  price: number;
  isActive: boolean;
  onUpgrade: () => void;
}

const featuresList = [
  "Unlimited applications",
  "AI Specific questions",
  "AI Cover letters",
  "AI Resumes",
  "Support: Email",
];

const Pricing: FC<PlanProps> = ({
  loading,
  type,
  price,
  isActive = false,
  onUpgrade,
}) => {
  const [navLoading, setLoading] = useState(loading);

  useEffect(() => {
    if (!loading) setLoading(false);
  }, [loading]);

  const title = useCallback(
    (isShort = false) => {
      if (type === "day") return isShort ? "BP" : "Daily Pass";
      else if (type === "week") return isShort ? "PP" : "Weekly Pass";
      else if (type === "month") return isShort ? "PBP" : "Monthly Pass";
    },
    [type]
  );

  const description = useMemo(() => {
    if (type === "day") return "Day";
    else if (type === "week") return "7 Days";
    else if (type === "month") return "30 Days";
  }, [type]);

  return (
    <div className={`relative w-full max-w-2xl ${isActive ? "bg-primary/10" : ""}`}>
      {isActive && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="badge text-xs text-primary-content font-semibold border-0 bg-primary">
            CURRENT PASS
          </span>
        </div>
      )}

      <div
        className={clsx(
          "relative flex flex-col gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg shadow-md border",
          isActive && "border border-primary"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <p className="text-lg lg:text-xl font-bold">{title(false)}</p>
        </div>

        <div className="flex gap-2 items-baseline">
          <p className="text-5xl font-extrabold">${price}</p>
          <p className="text-xs text-base-content/60 uppercase font-semibold">
            / {description}
          </p>
        </div>

        <ul className="space-y-2.5 text-base flex-1">
          {featuresList.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-base-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-[18px] h-[18px] text-primary opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="text-center pt-8 space-x-2">
          {isActive ? (
            <Button disabled>
              Current
            </Button>
          ) : (
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                onUpgrade();
              }}
            >
              {navLoading && <Loader2 className="animate-spin" />}
              Upgrade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;