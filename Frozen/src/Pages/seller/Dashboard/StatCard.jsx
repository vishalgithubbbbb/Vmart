const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "bg-blue-600",
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            {subtitle}
          </p>

        </div>

        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;