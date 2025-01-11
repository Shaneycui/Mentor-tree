import React from 'react';
import type { CareerStage } from '../../types/career';

interface Props {
  stage: CareerStage;
}

export default function CareerStageCard({ stage }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{stage.title}</h3>
      <p className="text-gray-600 mb-4">{stage.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {stage.required_skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {stage.responsibilities.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          Typical timeframe: {stage.timeframe}
        </span>
      </div>
    </div>
  );
}