import React from 'react';
import type { Challenge } from '../../types/career';
import { AlertTriangle } from 'lucide-react';

interface Props {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: Props) {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            {challenge.title}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{challenge.description}</p>
          </div>
          <div className="mt-3">
            <div className="text-sm font-medium text-yellow-800">解决方案：</div>
            <ul className="mt-1 list-disc list-inside text-sm text-yellow-700">
              {challenge.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 