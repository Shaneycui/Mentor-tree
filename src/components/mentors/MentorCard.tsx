import React from 'react';
import { Mentor } from '../../types/mentor';

interface Props {
  mentor: Mentor;
  onConnect: (mentorId: string) => void;
}

export default function MentorCard({ mentor, onConnect }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{mentor.fullName}</h3>
          <p className="text-sm text-gray-600">{mentor.title}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          mentor.availability === 'available' 
            ? 'bg-emerald-100 text-emerald-800'
            : mentor.availability === 'limited'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {mentor.availability}
        </span>
      </div>

      <p className="mt-4 text-gray-600">{mentor.bio}</p>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900">Specialties</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {mentor.specialties.map((specialty, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {mentor.yearsOfExperience} years of experience
        </span>
        <button
          onClick={() => onConnect(mentor.id)}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Connect
        </button>
      </div>
    </div>
  );
}