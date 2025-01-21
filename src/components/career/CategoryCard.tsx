import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  companies: Company[];
  onClick: () => void;
  onCompanySelect: (id: string) => void;
}

export default function CategoryCard({
  title,
  icon,
  description,
  companies,
  onClick,
  onCompanySelect
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="p-3 rounded-lg bg-purple-50 text-purple-600 w-fit">
        {icon}
      </div>
      <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="space-y-3">
        {companies.map(company => (
          <button
            key={company.id}
            onClick={() => onCompanySelect(company.id)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <span className="text-gray-700">{company.name}</span>
            <ChevronRight className="w-4 h-4 text-purple-600" />
          </button>
        ))}
      </div>
    </motion.div>
  );
} 