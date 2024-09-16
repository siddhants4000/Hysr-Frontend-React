import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = ({ data = [], onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    priceRange: '',
    modeOfInstruction: '',
    gender: '',
  });

  // Update the query search input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Update the filter selections
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter by experience (years of experience)
  const filterByExperience = (experience, filterValue) => {
    const exp = parseInt(experience, 10);
    if (isNaN(exp)) return false;

    switch (filterValue) {
      case '0-2':
        return exp >= 0 && exp <= 2;
      case '2-5':
        return exp > 2 && exp <= 5;
      case '5-10':
        return exp > 5 && exp <= 10;
      case '10+':
        return exp > 10;
      default:
        return true;
    }
  };

  // Helper function to handle "1000+" prices correctly
  const parsePrice = (price) => {
    if (typeof price === 'string' && price.includes('+')) {
      return parseFloat(price.replace('+', ''));
    }
    return parseFloat(price);
  };

  // Filter by price range
  const filterByPriceRange = (priceRange, priceFilter) => {
    const price = parsePrice(priceRange); // Convert price to a float
    if (isNaN(price)) return false; // If the price is not a valid number, return false

    switch (priceFilter) {
      case '400-700':
        return price >= 400 && price <= 700;
      case '700-1000':
        return price > 700 && price <= 1000;
      case '1000+':
        return price > 1000; // Correctly handle "1000+" case by checking if price is greater than 1000
      default:
        return true; // If no filter is applied, return true for all prices
    }
  };

  // Handle the search action
  const handleSearch = () => {
    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => {
        // Match the items taught (listItems)
        const matchesItemsTaught = item.listItems?.some((subject) =>
          subject.toLowerCase().includes(query.toLowerCase())
        );

        // Filter by years of experience
        const matchesExperience = filters.experience
          ? filterByExperience(item.experience, filters.experience)
          : true;

        // Filter by price range
        const matchesPrice = filters.priceRange
          ? filterByPriceRange(item.priceRange, filters.priceRange)
          : true;

        // Filter by mode of instruction (online, offline, etc.)
        const matchesModeOfInstruction = filters.modeOfInstruction
          ? item.modeOfInstruction?.toLowerCase() === filters.modeOfInstruction.toLowerCase()
          : true;

        // Filter by gender (male, female)
        const matchesGender = filters.gender
          ? item.gender?.toLowerCase() === filters.gender.toLowerCase()
          : true;

        return (
          matchesItemsTaught &&
          matchesExperience &&
          matchesPrice &&
          matchesModeOfInstruction &&
          matchesGender
        );
      });

      onSearch(filteredData.length > 0 ? filteredData : []); // Return empty array if no matches
    } else {
      console.error('Data is not an array');
      onSearch([]); // Default to empty array if invalid data
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search items taught..."
        value={query}
        onChange={handleInputChange}
      />
      <select name="experience" value={filters.experience} onChange={handleFilterChange}>
        <option value="">Years Of Experience</option>
        <option value="0-2">0-2 years</option>
        <option value="2-5">2-5 years</option>
        <option value="5-10">5-10 years</option>
        <option value="10+">10+ years</option>
      </select>
      <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
        <option value="">All Prices</option>
        <option value="400-700">400-700</option>
        <option value="700-1000">700-1000</option>
        <option value="1000+">1000+</option>
      </select>
      <select name="modeOfInstruction" value={filters.modeOfInstruction} onChange={handleFilterChange}>
        <option value="">Mode of Instruction</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="online and offline">Online And Offline</option>
      </select>
      <select name="gender" value={filters.gender} onChange={handleFilterChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchPage;
