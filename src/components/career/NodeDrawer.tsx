import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, Target, ArrowRight } from 'lucide-react';
import type { NodeData } from '../../types/career';

interface NodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  node: NodeData | null;
}

export default function NodeDrawer({ isOpen, onClose, node }: NodeDrawerProps) {
  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={onClose}
          />

          {/* 抽屉 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* 标题栏 */}
            <div className="sticky top-0 bg-white border-b z-10">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-xl font-bold">{node.label}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6 space-y-8">
              {/* 职位描述 */}
              {node.description && (
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold mb-3">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    职位描述
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              )}

              {/* 岗位要求 */}
              {node.requirements && node.requirements.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold mb-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    岗位要求
                  </h4>
                  <ul className="space-y-2">
                    {node.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 工作职责 */}
              {node.responsibilities && node.responsibilities.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold mb-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    工作职责
                  </h4>
                  <ul className="space-y-2">
                    {node.responsibilities.map((resp, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 