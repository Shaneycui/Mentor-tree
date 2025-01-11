import React, { useEffect, useState } from 'react';
import { getCareerPaths } from '../lib/career';
import type { CareerPath, CareerStage, CaseStudy, Challenge } from '../types/career';
import FishboneDiagram from '../components/career/FishboneDiagram';
import CaseStudyCard from '../components/career/CaseStudyCard';
import ChallengeCard from '../components/career/ChallengeCard';
import StageDetails from '../components/career/StageDetails';

interface CareerStageDetail extends CareerStage {
  responsibilities: string[];
  required_skills: string[];
  case_studies: CaseStudy[];
  challenges: Challenge[];
}

interface CareerPathDetail extends CareerPath {
  stages: CareerStageDetail[];
}

export default function CareerPath() {
  const [paths, setPaths] = useState<CareerPathDetail[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPathDetail | null>(null);
  const [selectedStage, setSelectedStage] = useState<CareerStageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCareerPaths() {
      try {
        const data = await getCareerPaths();
        setPaths(data);
        if (data.length > 0) {
          setSelectedPath(data[0]);
          setSelectedStage(data[0].stages[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载职业路径失败');
      } finally {
        setLoading(false);
      }
    }

    loadCareerPaths();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">职业发展路径</h1>
        
        {paths.length > 1 && (
          <select
            value={selectedPath?.id}
            onChange={(e) => {
              const path = paths.find(p => p.id === e.target.value);
              setSelectedPath(path || null);
              if (path) setSelectedStage(path.stages[0]);
            }}
            className="mt-2 sm:mt-0 block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            {paths.map(path => (
              <option key={path.id} value={path.id}>{path.title}</option>
            ))}
          </select>
        )}
      </div>

      {selectedPath && (
        <>
          {/* 鱼骨图 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
            <FishboneDiagram
              careerPath={selectedPath}
              onStageSelect={setSelectedStage}
              selectedStage={selectedStage}
            />
          </div>

          {/* 职位详情 */}
          {selectedStage && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧：职位详情 */}
              <div className="lg:col-span-2">
                <StageDetails stage={selectedStage} />
              </div>

              {/* 右侧：案例和挑战 */}
              <div className="space-y-6">
                {/* 职业困难与解决方案 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    常见职业困难与解决方案
                  </h3>
                  <div className="space-y-4">
                    {selectedStage.challenges.map((challenge, index) => (
                      <ChallengeCard key={index} challenge={challenge} />
                    ))}
                  </div>
                </div>

                {/* 真实案例 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    真实案例参考
                  </h3>
                  <div className="space-y-4">
                    {selectedStage.case_studies.map((caseStudy, index) => (
                      <CaseStudyCard key={index} caseStudy={caseStudy} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}