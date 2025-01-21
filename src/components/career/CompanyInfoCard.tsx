import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Building } from 'lucide-react';
import type { SearchResult } from '../../services/perplexityService';

interface CompanyInfoCardProps {
  result: SearchResult;
  onViewStructure: () => void;
}

export default function CompanyInfoCard({ result, onViewStructure }: CompanyInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{result.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {result.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              来源: {result.source}
            </span>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
            >
              查看原文 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <button
          onClick={onViewStructure}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Building className="w-5 h-5" />
          查看组织架构
        </button>
      </div>
    </motion.div>
  );
} 