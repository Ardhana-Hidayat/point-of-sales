import { CardDashboardInfo } from "@/components/organism/CardDashboardInfo";
import { ChartDashboard } from "@/components/organism/ChartDashboard";

export default function DashboardPage() {
  return (
    <div className="ml-10">
      <div>
        Dashboard
      </div>

      <div className="space-y-5 mt-5">

        <div className="w-[600px] fixed bottom-10">
          <div className="w-[200px] mb-10">
            <CardDashboardInfo />
          </div>

          <ChartDashboard />
        </div>
      </div>
    </div>
  );
}
