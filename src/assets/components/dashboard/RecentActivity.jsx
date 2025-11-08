import recentactivity_logo from "../../../assets/icons/recentactivity_logo.svg"
export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-3xl w-full p-6 border border-gray-200 shadow-sm">
      <h3 className="text-2xl font-normal mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              {/* <User size={18} className="text-purple-600" /> */}
              <img src={recentactivity_logo} alt="Recent Activity" className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg text-gray-700">{activity.text}</p>
              <p className="text-sm text-gray-500 ">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}