// components/stats/StatsCards.tsx

import {
  CheckCircleIcon,
  ChartBarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

interface StatsCardsProps {
  totalJobsApplied: number;
  totalJobsAnalyzed: number;
  totalJobRolesCreated: number;
}

const StatsCards = ({
  totalJobsApplied,
  totalJobsAnalyzed,
  totalJobRolesCreated,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Jobs Applied */}
      <div className="stats shadow bg-primary text-white p-4 rounded-lg">
        <div className="stat">
          <div className="stat-figure">
            <CheckCircleIcon className="inline-block h-12 w-12" />
          </div>
          <div>Total Jobs Applied</div>
          <div className="text-4xl font-extrabold">{totalJobsApplied}</div>
          <div className="text-xs text-white/70">out of 100</div>{" "}
          {/* Puedes ajustar esto según sea necesario */}
        </div>
      </div>

      {/* Total Jobs Analyzed */}
      <div className="stats shadow bg-base-100 p-4 rounded-lg">
        <div className="stat">
          <div className="stat-figure text-primary">
            <ChartBarIcon className="inline-block h-12 w-12" />
          </div>
          <div>Total Jobs Analyzed</div>
          <div className="text-4xl font-extrabold">{totalJobsAnalyzed}</div>
        </div>
      </div>

      {/* Total Job Roles Created */}
      <div className="stats shadow bg-base-100 p-4 rounded-lg">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BriefcaseIcon className="inline-block h-12 w-12" />
          </div>
          <div>Job Roles Created</div>
          <div className="text-4xl font-extrabold">{totalJobRolesCreated}</div>
          <div className="text-xs text-primary/70">out of 8</div>{" "}
          {/* Ajusta esto también si es necesario */}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
