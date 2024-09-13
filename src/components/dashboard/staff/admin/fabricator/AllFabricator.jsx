/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Service from '../../../../../config/Service'

const AllFabricator = () => {
  const fabricators = useSelector((state) => state?.fabricatorData.fabricatorData)
  const [fabricator, setFabricator] = useState([])
  const [filteredFabricators, setFilteredFabricators] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState({ key: 'name', order: 'asc' })
  const [filters, setFilters] = useState({
    country: '',
    state: '',
    city: '',
  })

  const token = sessionStorage.getItem('token')

  const fetchAllFabricator = async () => {
    const fabricatorData = await Service.allFabricator(token)
    setFabricator(fabricatorData)
    setFilteredFabricators(fabricatorData) // Set filteredFabricators to fetched data initially
  }

  useEffect(() => {
    fetchAllFabricator()
  }, [])

  // Handle search filtering
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    filterAndSortData(e.target.value, filters, sortOrder)
  }

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
    filterAndSortData(searchQuery, { ...filters, [name]: value }, sortOrder)
  }

  // Sort fabricators based on the column header clicked
  const handleSort = (key) => {
    const order = sortOrder.key === key && sortOrder.order === 'asc' ? 'desc' : 'asc'
    setSortOrder({ key, order })
    filterAndSortData(searchQuery, filters, { key, order })
  }

  // Function to handle filtering and sorting
  const filterAndSortData = (searchQuery, filters, sortOrder) => {
    let filtered = fabricator.filter((fab) => {
      const searchMatch =
        fab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fab.country.toLowerCase().includes(searchQuery.toLowerCase())

      const filterMatch =
        (!filters.country || fab.country === filters.country) &&
        (!filters.state || fab.state === filters.state) &&
        (!filters.city || fab.city === filters.city)

      return searchMatch && filterMatch
    })

    // Sorting
    filtered.sort((a, b) => {
      const aKey = a[sortOrder.key].toLowerCase()
      const bKey = b[sortOrder.key].toLowerCase()
      if (sortOrder.order === 'asc') return aKey > bKey ? 1 : -1
      return aKey < bKey ? 1 : -1
    })

    setFilteredFabricators(filtered)
  }

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
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Filter by Country</option>
            {Array.from(new Set(fabricator.map((fab) => fab.country))).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Filter by State</option>
            {Array.from(new Set(fabricator.map((fab) => fab.state))).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Filter by City</option>
            {Array.from(new Set(fabricator.map((fab) => fab.city))).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center text-sm md:text-lg rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                <th
                  className="px-2 py-1 text-left cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Fabricator Name
                  {sortOrder.key === 'name' && (sortOrder.order === 'asc' ? ' ' : ' ')}
                </th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort('city')}
                >
                  City
                  {sortOrder.key === 'city' && (sortOrder.order === 'asc' ? ' ' : ' ')}
                </th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort('state')}
                >
                  State
                  {sortOrder.key === 'state' && (sortOrder.order === 'asc' ? ' ' : ' ')}
                </th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort('country')}
                >
                  Country
                  {sortOrder.key === 'country' && (sortOrder.order === 'asc' ? ' ' : ' ')}
                </th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFabricators.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="5" className="text-center">
                    No Fabricator Found
                  </td>
                </tr>
              ) : (
                filteredFabricators?.map((fabricator) => (
                  <tr key={fabricator.id} className="hover:bg-blue-gray-100 border">
                    <td className="border px-2 py-1 text-left">{fabricator.name}</td>
                    <td className="border px-2 py-1">{fabricator.city}</td>
                    <td className="border px-2 py-1">{fabricator.state}</td>
                    <td className="border px-2 py-1">{fabricator.country}</td>
                    <td className="border px-2 py-1">Button</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllFabricator
