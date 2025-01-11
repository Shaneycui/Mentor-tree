import React from 'react';
import type { CaseStudy } from '../../types/career';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">{caseStudy.industry}</h4>
          <p className="text-xs text-gray-500">{caseStudy.position}</p>
        </div>
        <span className="text-xs text-gray-500">{caseStudy.experience_years}年经验</span>
      </div>
      
      <div className="mt-3">
        <h5 className="text-xs font-medium text-gray-700 mb-1">技能组合</h5>
        <div className="flex flex-wrap gap-1">
          {caseStudy.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <h5 className="text-xs font-medium text-gray-700 mb-1">成长经验</h5>
        <p className="text-xs text-gray-600">{caseStudy.growth_story}</p>
      </div>
    </div>
  );
} 