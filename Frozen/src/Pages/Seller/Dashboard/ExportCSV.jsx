import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaFileCsv } from "react-icons/fa";

const ExportCSV = ({
  recentOrders = [],
  totalOrders = 0,
  totalRevenue = 0,
}) => {

  const handleExport = () => {

    const csvData = recentOrders.map((order) => ({
      OrderID: order._id,
      Amount: order.amount,
      Payment: order.paymentType,
      Status: order.status,
      Paid: order.isPaid ? "Yes" : "No",
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));

    // Summary Row
    csvData.unshift({
      OrderID: "SUMMARY",
      Amount: totalRevenue,
      Payment: "",
      Status: `Total Orders : ${totalOrders}`,
      Paid: "",
      Date: "",
    });

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "sales-report.csv");
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl shadow-lg transition-all"
    >
      <FaFileCsv size={22} />
      Export Sales CSV
    </button>
  );
};

export default ExportCSV;