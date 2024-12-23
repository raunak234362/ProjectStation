/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, GetFabricator } from "../../../../index.js";
import Service from "../../../../../config/Service.js";
import { loadFabricator } from "../../../../../store/fabricatorSlice.js";

const AllFabricator = () => {
  const fabricators = useSelector(
    (state) => state?.fabricatorData?.fabricatorData?.data || []
  );

  console.log(fabricators);
  const dispatch = useDispatch();

  const getAllFabricators = async () => {
    try {
      const response = await Service.allFabricator();
      dispatch(loadFabricator(response));
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFabricators()
  }, []);

  const [filteredFabricators, setFilteredFabricators] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState({ key: "name", order: "asc" });
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [selectedFabricator, setSelectedFabricator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronize fabricators with filteredFabricators
  useEffect(() => {
    setFilteredFabricators(fabricators);
  }, [fabricators]);

  // Filter and sort data
  const filterAndSortData = () => {
    let filtered = fabricators?.filter((fab) => {
      const searchMatch =
        fab?.fabName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab?.headquaters?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab?.headquaters?.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab?.headquaters?.country?.toLowerCase().includes(searchQuery.toLowerCase());

      const filterMatch =
        (!filters?.country || fab.headquaters?.country === filters?.country) &&
        (!filters?.state || fab.headquaters?.state === filters?.state) &&
        (!filters?.city || fab.headquaters?.city === filters?.city);

      return searchMatch && filterMatch;
    });

    // Sorting
    filtered.sort((a, b) => {
      const aKey = a.headquaters[sortOrder.key]?.toLowerCase();
      const bKey = b.headquaters[sortOrder.key]?.toLowerCase();
      if (sortOrder.order === "asc") return aKey > bKey ? 1 : -1;
      return aKey < bKey ? 1 : -1;
    });

    setFilteredFabricators(filtered);
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Sort handler
  const handleSort = (key) => {
    const order =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ key, order });
  };

  // Modal view handlers
  const handleViewClick = (fabricatorId) => {
    setSelectedFabricator(fabricatorId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFabricator(null);
    setIsModalOpen(false);
  };

  // Update filtered data when dependencies change
  useEffect(() => {
    filterAndSortData();
  }, [searchQuery, filters, sortOrder, fabricators]);

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 bg-white h-auto p-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, city, state or country"
          className="border p-2 rounded w-full mb-4"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Filter Section */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["country", "state", "city"]?.map((filterKey) => (
            <select
              key={filterKey}
              name={filterKey}
              value={filters[filterKey]}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">Filter by {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</option>
              {Array.from(
                new Set(fabricators?.map((fab) => fab?.headquaters[filterKey]))
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center text-sm md:text-lg rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                {["name", "city", "state", "country"].map((key) => (
                  <th
                    key={key}
                    className="px-2 py-1 cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortOrder.key === key && (sortOrder.order === "asc" ? " ↑" : " ↓")}
                  </th>
                ))}
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFabricators?.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="5" className="text-center">
                    No Fabricator Found
                  </td>
                </tr>
              ) : (
                filteredFabricators?.map((fab) => (
                  <tr
                    key={fab.id}
                    className="hover:bg-blue-gray-100 border"
                  >
                    <td className="border px-2 py-1 text-left">{fab.fabName}</td>
                    <td className="border px-2 py-1">{fab.headquaters?.city}</td>
                    <td className="border px-2 py-1">{fab.headquaters?.state}</td>
                    <td className="border px-2 py-1">{fab.headquaters?.country}</td>
                    <td className="border px-2 py-1">
                      <Button onClick={() => handleViewClick(fab.id)}>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedFabricator && (
          <GetFabricator
            fabricatorId={selectedFabricator}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default AllFabricator;
