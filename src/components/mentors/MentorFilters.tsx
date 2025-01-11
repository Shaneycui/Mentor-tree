import React from 'react';
import { MentorFilter } from '../../types/mentor';

interface Props {
  filters: MentorFilter;
  onFilterChange: (filters: MentorFilter) => void;
  specialties: string[];
}

export default function MentorFilters({ filters, onFilterChange, specialties }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
          Specialty
        </label>
        <select
          id="specialty"
          value={filters.specialty || ''}
          onChange={(e) => onFilterChange({ ...filters, specialty: e.target.value || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Minimum Years of Experience
        </label>
        <input
          type="number"
          id="experience"
          min="0"
          value={filters.yearsOfExperience || ''}
          onChange={(e) => onFilterChange({ 
            ...filters, 
            yearsOfExperience: e.target.value ? Number(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        <select
          id="availability"
          value={filters.availability || ''}
          onChange={(e) => onFilterChange({ ...filters, availability: e.target.value || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="">Any Availability</option>
          <option value="available">Available</option>
          <option value="limited">Limited</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
    </div>
  );
}