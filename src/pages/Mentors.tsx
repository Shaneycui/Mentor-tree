import React, { useState, useEffect } from 'react';
import { getMentors } from '../lib/mentors';
import type { Mentor, MentorFilter } from '../types/mentor';
import MentorCard from '../components/mentors/MentorCard';
import MentorFilters from '../components/mentors/MentorFilters';

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filters, setFilters] = useState<MentorFilter>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get unique specialties from all mentors
  const specialties = [...new Set(mentors.flatMap(m => m.specialties))].sort();

  useEffect(() => {
    async function loadMentors() {
      try {
        setLoading(true);
        const data = await getMentors(filters);
        setMentors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load mentors');
      } finally {
        setLoading(false);
      }
    }

    loadMentors();
  }, [filters]);

  async function handleConnect(mentorId: string) {
    // TODO: Implement connection logic
    console.log('Connecting with mentor:', mentorId);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="md:hidden">
          <details className="bg-white rounded-lg shadow-md">
            <summary className="p-4 font-medium cursor-pointer">
              Filter Mentors
            </summary>
            <div className="p-4 pt-0">
              <MentorFilters
                filters={filters}
                onFilterChange={setFilters}
                specialties={specialties}
              />
            </div>
          </details>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <MentorFilters
              filters={filters}
              onFilterChange={setFilters}
              specialties={specialties}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onConnect={handleConnect}
                />
              ))}
            </div>
            
            {mentors.length === 0 && (
              <p className="text-center text-gray-500">
                No mentors found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}