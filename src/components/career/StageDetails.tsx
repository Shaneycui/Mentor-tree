import React from 'react';
import { Briefcase, Book, Target, Clock } from 'lucide-react';
import type { CareerStageDetail } from '../../types/career';

interface Props {
  stage: CareerStageDetail;
}

export default function StageDetails({ stage }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{stage.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
        </div>
        <div className="flex items-center text-emerald-600">
          <Clock className="h-5 w-5" />
          <span className="ml-2 text-sm">{stage.timeframe}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 核心职责 */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-900">
            <Briefcase className="h-5 w-5" />
            <h3 className="ml-2 text-lg font-medium">核心职责</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {stage.responsibilities.map((resp, index) => (
              <li key={index} className="text-sm">
                {resp}
              </li>
            ))}
          </ul>
        </div>

        {/* 能力要求 */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-900">
            <Target className="h-5 w-5" />
            <h3 className="ml-2 text-lg font-medium">能力要求</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stage.required_skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 学习资源 */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center text-gray-900 mb-4">
          <Book className="h-5 w-5" />
          <h3 className="ml-2 text-lg font-medium">推荐学习资源</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stage.learning_resources?.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
              <p className="mt-1 text-xs text-gray-500">{resource.description}</p>
              <div className="mt-2 flex items-center text-emerald-600 text-xs">
                <span>{resource.type}</span>
                {resource.duration && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{resource.duration}</span>
                  </>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 