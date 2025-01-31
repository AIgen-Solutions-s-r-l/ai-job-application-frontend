"use client";

import React, { useMemo, useState } from "react";
import { UserPlan } from "../subscription/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PassesProps {
  userPlan: UserPlan;
}

const Passes = ({ userPlan }: PassesProps) => {
  const router = useRouter();
  const [routing, setRouting] = useState(false);

  const expireDate = userPlan.expireDate
    ? moment.utc(userPlan.expireDate)
    : moment().utc();
  const remain: moment.Duration = moment.duration(expireDate.diff(moment()));

  const remainStr: string = useMemo(() => {
    const months = remain.months();
    const days = remain.days();
    const hours = remain.hours();
    const minutes = remain.minutes();

    const plural = (some: number) => (some > 1 ? "s" : "");

    return `${months ? months + " Month" + plural(months) : ""}
    ${days ? days + " Day" + plural(days) : ""}
    ${hours ? hours + " Hour" + plural(hours) : ""}
    ${minutes ? minutes + " Minute" + plural(minutes) : ""}
    `;
  }, [remain]);

  let period: moment.Duration;
  if (userPlan.currentPlan?.type === "week") {
    period = moment.duration(1, "week");
  } else if (userPlan.currentPlan?.type === "month") {
    period = moment.duration(1, "month");
  } else {
    period = moment.duration(1, `second`);
  }

  const isExpired = useMemo(() => expireDate <= moment(), [expireDate]);

  const percent = Math.round(
    Math.min(remain.asMinutes() / period.asMinutes(), 1) * 100
  );

  return (
    <div className="col-span-1 rounded-lg shadow bg-white p-6">
      <div className="border-b pb-4 mb-4 border-neutral">
        <h3 className="text-lg font-semibold">Your Pass</h3>
      </div>

      {/* Si hay un pase activo */}
      {!isExpired ? (
        <div className="mb-4">
          <p>
            Active pass:{" "}
            <strong className="text-primary uppercase">
              {userPlan.currentPlan.plan_name}
            </strong>
          </p>

          {/* Barra de progreso visual */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4 relative">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${percent}%` }}
            />
            <span className="absolute right-2 text-xs top-0.5 text-gray-800">
              {Math.round(percent)}%
            </span>
          </div>
          <p className="text-sm mt-4">
            Time remaining: <strong>{remainStr}</strong>
          </p>
        </div>
      ) : (
        <p className="text-sm">No active pass at the moment.</p>
      )}

      {/* Botón para gestionar o comprar más pases */}
      <div className="mt-6">
        <button
          disabled={routing}
          className="btn btn-outline btn-primary hover:text-white w-full"
          onClick={() => {
            setRouting(true);
            router.push(`/dashboard/subscription`);
          }}
        >
          {routing && <Loader2 className="animate-spin" />}
          Buy Passes
        </button>
      </div>
    </div>
  );
};

export default Passes;
