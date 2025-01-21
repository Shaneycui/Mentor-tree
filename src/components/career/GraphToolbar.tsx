import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw,
  Search,
  Filter
} from 'lucide-react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';

interface GraphToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onReset: () => void;
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  nodeTypes: { value: string; label: string; }[];
}

export default function GraphToolbar({
  onZoomIn,
  onZoomOut,
  onFitView,
  onReset,
  searchTerm,
  onSearch,
  selectedType,
  onTypeChange,
  nodeTypes
}: GraphToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<ZoomIn className="w-4 h-4" />}
          onClick={onZoomIn}
        >
          放大
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<ZoomOut className="w-4 h-4" />}
          onClick={onZoomOut}
        >
          缩小
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<Maximize2 className="w-4 h-4" />}
          onClick={onFitView}
        >
          适应屏幕
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={onReset}
        >
          重置
        </Button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="w-64">
          <Input
            placeholder="搜索节点..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="w-48">
          <Select
            options={nodeTypes}
            value={selectedType}
            onChange={onTypeChange}
            icon={<Filter className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
} 