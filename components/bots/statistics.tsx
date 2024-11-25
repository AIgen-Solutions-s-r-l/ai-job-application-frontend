import { Bot } from "@/libs/definitions"; // Asegúrate de que tienes el tipo definido

interface BotStatisticsProps {
  bots: Bot[];
}

export default function BotStatistics({ bots }: BotStatisticsProps) {
  const totalApplications = bots.reduce((acc, bot) => acc + bot.total_applications, 0);
  const activeBots = bots.filter((bot) => bot.status === 'active').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Total Bots */}
      <div className="stats shadow bg-base-100 text-white p-4 shadow-md">
        <div className="stat">
          <div className="stat-title">Total Bots</div>
          <div className="stat-value text-primary">{bots.length}</div>
          <div className="stat-desc">Total bots created and managed</div>
        </div>
      </div>

      {/* Total Applications */}
      <div className="stats shadow bg-base-100 p-4 shadow-md">
        <div className="stat">
          <div className="stat-title">Total Applications</div>
          <div className="stat-value text-primary">{totalApplications}</div>
          <div className="stat-desc text-gray-500">Total applications made by all bots</div>
        </div>
      </div>

      {/* Active Bots */}
      <div className="stats shadow bg-base-100 p-4 shadow-md">
        <div className="stat">
          <div className="stat-title">Active Bots</div>
          <div className="stat-value text-primary">{activeBots}</div>
          <div className="stat-desc text-gray-500">Bots currently running and applying</div>
        </div>
      </div>
    </div>
  );
}