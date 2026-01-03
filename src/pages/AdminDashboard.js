import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 15,
  });
  
  // State to track which rows are expanded
  const [expandedRows, setExpandedRows] = useState([]);

  const navigate = useNavigate();

  // Toggle function for expanding rows
  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  // Hàm lấy danh sách khách mời
  const fetchGuests = async (page = 1) => {
    setLoading(true);
    const token = localStorage.getItem("weddingToken");

    try {
      const response = await fetch(
        `https://be.dudoanchungketlcp-tta.vn/api/member?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("weddingToken");
        navigate("/login");
        return;
      }

      const data = await response.json();
      if (data && data.data) {
        setGuests(data.data);
        setPagination({
          current_page: data?.pagination?.current_page,
          last_page: data?.pagination?.last_page,
          total: data?.pagination?.total,
          per_page: data?.pagination?.per_page || 15,
        });
        // Reset expanded rows when page changes
        setExpandedRows([]);
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm Export Excel
  const handleExport = async () => {
    const token = localStorage.getItem("weddingToken");
    try {
      const response = await fetch(
        "https://be.dudoanchungketlcp-tta.vn/api/member/export",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "guest_list.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Export failed!");
      }
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Error exporting data");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("weddingToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchGuests(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- TÍNH TOÁN TỔNG SỐ NGƯỜI (PAX) TRÊN TRANG HIỆN TẠI ---
  const totalPeopleOnPage = guests.reduce((acc, guest) => {
    // Khách chính (1) + số lượng khách đi kèm
    return acc + 1 + (guest.companions ? guest.companions.length : 0);
  }, 0);

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between h-auto md:h-16 py-2 md:py-0 gap-2 md:gap-0">
            <div className="flex items-center justify-center md:justify-start">
              <h1 className="text-xl md:text-2xl font-bold font-script text-gray-800 tracking-tight">
                Wedding Admin
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 border border-transparent text-sm md:text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Export Excel
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 text-sm md:text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Stats / Overview */}
        <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Guest List</h2>
            <p className="mt-1 text-sm md:text-lg text-gray-600">
              Manage your wedding invitations and RSVPs.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-2 md:gap-4 w-full md:w-auto">
            {/* Total Invitations (Rows in DB) */}
            <div className="flex-1 md:flex-none bg-white px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md border border-gray-200 flex flex-col items-center min-w-[100px] md:min-w-[140px]">
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider text-center">
                Invitations
              </span>
              <span className="font-bold text-indigo-700 text-xl md:text-3xl">
                {pagination.total}
              </span>
            </div>

            {/* Total Pax (Headcount on current page) */}
            <div className="flex-1 md:flex-none bg-white px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md border border-gray-200 flex flex-col items-center min-w-[100px] md:min-w-[140px]">
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider text-center">
                Pax (Page)
              </span>
              <span className="font-bold text-green-700 text-xl md:text-3xl">
                {totalPeopleOnPage}
              </span>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider w-10 md:w-16"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider w-1/4"
                  >
                    Main Guest
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Dietary
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm md:text-lg">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <p className="text-base text-gray-500">Loading data...</p>
                    </td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500 italic"
                    >
                      No guests found.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest, index) => {
                    const isExpanded = expandedRows.includes(guest.id);
                    
                    // Calculate continuous row number across pages
                    // Formula: (Current Page - 1) * Items Per Page + Current Index + 1
                    const rowNumber =
                      (pagination.current_page - 1) * pagination.per_page +
                      index +
                      1;
                    
                    // Calculate total pax for this specific group
                    const groupSize = 1 + (guest.companions ? guest.companions.length : 0);

                    return (
                      <React.Fragment key={guest.id}>
                        {/* Main Row */}
                        <tr
                          className={`hover:bg-gray-50 transition-colors duration-150 ${
                            isExpanded ? "bg-gray-50" : ""
                          }`}
                        >
                          <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-500 font-bold">
                            {rowNumber}
                          </td>
                          <td className="px-3 md:px-6 py-3 md:py-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                <span className="text-sm md:text-lg font-bold text-gray-900">
                                {guest.full_name}
                                </span>
                                {groupSize > 1 && (
                                    <span className="w-fit bg-blue-100 text-blue-800 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200" title="Total people in this group">
                                        +{groupSize - 1}
                                    </span>
                                )}
                                {/* Mobile Dietary Display */}
                                {guest.dietary && (
                                    <span className="sm:hidden text-xs text-gray-500 italic truncate max-w-[150px]">
                                        Diet: {guest.dietary}
                                    </span>
                                )}
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4">
                            {guest.dietary ? (
                              <span
                                className="text-gray-700 truncate block max-w-[200px]"
                                title={guest.dietary}
                              >
                                {guest.dietary}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 md:px-3 md:py-1 inline-flex text-[10px] md:text-sm leading-5 font-bold rounded-full border ${
                                guest.status === "attending"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }`}
                            >
                              {guest.status === "attending"
                                ? "Attending"
                                : "Not Attending"}
                            </span>
                          </td>
                          <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                            <button
                              onClick={() => toggleRow(guest.id)}
                              className={`inline-flex items-center px-2 py-1 md:px-3 md:py-1.5 border text-xs md:text-sm font-medium rounded-md focus:outline-none transition-colors ${
                                isExpanded
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {isExpanded ? "Hide" : "View"}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Row Details */}
                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan="5" className="px-3 md:px-6 py-4 border-t border-gray-200">
                              <div className="pl-0 md:pl-16 pr-0 md:pr-4">
                                {/* Note Section */}
                                <div className="mb-4">
                                  <h4 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Note from Guest:
                                  </h4>
                                  <p className="text-sm md:text-base text-gray-800 bg-white p-3 rounded border border-gray-200 italic">
                                    {guest.note || "No special notes."}
                                  </p>
                                </div>

                                {/* Companions Section */}
                                <div>
                                  <h4 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Companions ({guest.companions?.length || 0}):
                                  </h4>
                                  {guest.companions &&
                                  guest.companions.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                      {guest.companions.map((comp, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm"
                                        >
                                          <div className="flex flex-col gap-1">
                                            <span
                                              className="font-bold text-gray-900 text-base md:text-lg"
                                              title={comp.full_name}
                                            >
                                              {comp.full_name}
                                            </span>
                                            <div className="flex items-start gap-2 mt-1">
                                              <span className="text-xs md:text-sm font-bold text-gray-500 min-w-[50px] md:min-w-[60px]">
                                                Dietary:
                                              </span>
                                              <span
                                                className="text-xs md:text-sm text-gray-700 italic"
                                                title={comp.dietary}
                                              >
                                                {comp.dietary || "None"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 italic text-sm">
                                      No companions registered.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!loading && pagination.last_page > 1 && (
            <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-base text-gray-700">
                    Showing page{" "}
                    <span className="font-bold">{pagination.current_page}</span>{" "}
                    of{" "}
                    <span className="font-bold">{pagination.last_page}</span>
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => fetchGuests(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchGuests(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
              {/* Mobile Pagination */}
              <div className="flex items-center justify-between w-full sm:hidden">
                <button
                  onClick={() => fetchGuests(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchGuests(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;