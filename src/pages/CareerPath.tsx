import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Building,
  Building2,
  Users,
  ChevronRight,
  Briefcase,
  LineChart,
  Flask,
  Stethoscope,
  ArrowLeft
} from 'lucide-react';
import ReactFlow, { 
  Handle, 
  Position, 
  MarkerType,
  Background,
  Controls,
  Node,
  Edge,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import Modal from 'react-modal';
import CategoryCard from '../components/career/CategoryCard';
import CompanyInfoCard from '../components/career/CompanyInfoCard';
import CareerGraph from '../components/career/CareerGraph';
import NodeDrawer from '../components/career/NodeDrawer';
import GraphToolbar from '../components/career/GraphToolbar';
import Loading from '../components/shared/Loading';
import { searchCompanyInfo } from '../services/perplexityService';
import type { NodeData } from '../types/career';

interface OrgStructure {
  title: string;
  description: string;
  governance: {
    name: string;
    description: string;
    subunits: {
      name: string;
      roles: Role[];
    }[];
  }[];
}

interface Role {
  title: string;
  level: string;
  responsibilities: string[];
  requirements: string[];
  videoUrl?: string;
  skills?: string[];
  connections?: string[];
  career_path?: string[];
  salary_range?: string;
}

interface NodeData {
  label: string;
  type: 'root' | 'governance' | 'subunit' | 'role';
  description?: string;
  level?: string;
  responsibilities?: string[];
  requirements?: string[];
}

interface EdgeData {
  label: string;
  type: 'reports_to' | 'collaborates_with' | 'promotes_to' | 'manages' | 
        'mentors' | 'trains' | 'supports' | 'coordinates_with' | 'leads';
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">出错了</h2>
            <p className="text-gray-600">请刷新页面重试</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 1. 首先定义所有辅助函数
const calculateNodePosition = (
  type: string,
  index: number,
  totalNodes: number,
  centerX: number = 500,
  centerY: number = 300,
  radius: number = 250
): { x: number; y: number } => {
  if (type === 'root') {
    return { x: centerX, y: centerY };
  }

  const angleStep = (2 * Math.PI) / totalNodes;
  const angleOffset = Math.PI / 6;
  const angle = angleOffset + index * angleStep;
  
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
};

// 节点样式配置
const nodeStyles = {
  root: {
    bg: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-700'
  },
  governance: {
    bg: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-600'
  },
  subunit: {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-300'
  },
  role: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-300'
  }
};

// 2. 然后定义组件
function CompanyDetail({ company, onBack }: CompanyDetailProps) {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // 生成节点
  const nodes = useMemo(() => {
    if (!company) return [];
    const result: Node[] = [];
    const centerX = 500;
    const centerY = 300;

    // 添加公司根节点
    result.push({
      id: 'root',
      position: { x: centerX, y: centerY },
      data: { 
        label: company.title,
        type: 'root',
        description: company.description
      },
      type: 'customNode'
    });

    // 遍历公司治理结构
    company.governance.forEach((gov, govIndex) => {
      const govId = `gov-${govIndex}`;
      const position = calculateNodePosition(
        'governance',
        govIndex,
        company.governance.length,
        centerX,
        centerY,
        200
      );

      result.push({
        id: govId,
        position,
        data: {
          label: gov.name,
          type: 'governance',
          description: gov.description
        },
        type: 'customNode'
      });

      // 遍历子部门
      gov.subunits.forEach((unit, unitIndex) => {
        const unitId = `${govId}-unit-${unitIndex}`;
        const unitPosition = calculateNodePosition(
          'subunit',
          unitIndex,
          gov.subunits.length,
          position.x,
          position.y,
          150
        );

        result.push({
          id: unitId,
          position: unitPosition,
          data: {
            label: unit.name,
            type: 'subunit'
          },
          type: 'customNode'
        });

        // 遍历角色
        unit.roles.forEach((role, roleIndex) => {
          const roleId = `${unitId}-role-${roleIndex}`;
          result.push({
            id: roleId,
            position: calculateNodePosition(
              'role',
              roleIndex,
              unit.roles.length,
              unitPosition.x,
              unitPosition.y,
              100
            ),
            data: {
              label: role.title,
              type: 'role',
              level: role.level,
              responsibilities: role.responsibilities,
              requirements: role.requirements,
              videoUrl: role.videoUrl,
              skills: role.skills,
              connections: role.connections,
              career_path: role.career_path,
              salary_range: role.salary_range
            },
            type: 'customNode'
          });
        });
      });
    });

    return result;
  }, [company]);

  // 生成边
  const edges = useMemo(() => {
    if (!nodes.length) return [];
    const result: Edge<EdgeData>[] = [];

    // 遍历节点生成边
    nodes.forEach(node => {
      if (node.data.type === 'governance') {
        // 连接根节点到治理层
        result.push({
          id: `edge-root-${node.id}`,
          source: 'root',
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#666' },
          markerEnd: { type: MarkerType.ArrowClosed }
        });
      } else if (node.data.type === 'subunit') {
        // 连接治理层到子部门
        const govId = node.id.split('-')[0];
        result.push({
          id: `edge-${govId}-${node.id}`,
          source: govId,
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#666' },
          markerEnd: { type: MarkerType.ArrowClosed }
        });
      } else if (node.data.type === 'role') {
        // 连接子部门到角色
        const unitId = node.id.split('-role-')[0];
        result.push({
          id: `edge-${unitId}-${node.id}`,
          source: unitId,
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#666' },
          markerEnd: { type: MarkerType.ArrowClosed }
        });
      }
    });

    return result;
  }, [nodes]);

  // 过滤节点
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesSearch = node.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          node.data.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || node.data.type === filterType;
      const matchesLevel = filterLevel === 'all' || node.data.level === filterLevel;
      
      return matchesSearch && matchesType && matchesLevel;
    });
  }, [nodes, searchTerm, filterType, filterLevel]);

  // 计算布局
  const layout = useMemo(() => {
    return filteredNodes.map(node => ({
      ...node,
      position: calculateNodePosition(
        node.data.type,
        parseInt(node.id.split('-').pop() || '0'),
        filteredNodes.filter(n => n.data.type === node.data.type).length
      )
    }));
  }, [filteredNodes]);

  // 自定义节点组件
  const CustomNode = ({ data }: { data: NodeData }) => {
    const style = nodeStyles[data.type as keyof typeof nodeStyles];
    
    return (
      <div
        className={`
          p-4 rounded-lg cursor-pointer transition-all duration-200
          ${style.bg} ${style.text} border-2 ${style.border}
          hover:shadow-lg transform hover:-translate-y-0.5
        `}
      >
        <Handle type="target" position={Position.Top} />
        <div className="font-medium text-center">{data.label}</div>
        {data.level && (
          <div className="text-xs opacity-75 mt-1 text-center">{data.level}</div>
        )}
        {data.skills && data.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.skills.slice(0, 2).map((skill, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-opacity-20 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };

  return (
    <div className="h-screen">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
        返回公司列表
      </button>

      {/* 搜索和过滤控件 */}
      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <input
          type="text"
          placeholder="搜索职位或部门..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200"
        >
          <option value="all">所有类型</option>
          <option value="governance">管理层</option>
          <option value="subunit">部门</option>
          <option value="role">职位</option>
        </select>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200"
        >
          <option value="all">所有级别</option>
          <option value="C-Suite">C-Suite</option>
          <option value="VP">VP</option>
          <option value="Director">Director</option>
          <option value="Manager">Manager</option>
          <option value="Senior">Senior</option>
          <option value="Specialist">Specialist</option>
        </select>
      </div>

      <ReactFlow
        nodes={layout}
        edges={edges}
        nodeTypes={{ customNode: CustomNode }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'root': return '#9333ea';
              case 'governance': return '#2563eb';
              case 'subunit': return '#dbeafe';
              case 'role': return '#ffffff';
              default: return '#f3f4f6';
            }
          }}
        />
      </ReactFlow>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedNode && (
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{selectedNode.label}</h3>
              <button 
                onClick={() => setModalIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
          </div>

            {selectedNode.videoUrl && (
              <div className="aspect-video mb-4 bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedNode.videoUrl}
                  controls
                  className="w-full h-full"
                />
              </div>
            )}

                  <div className="space-y-4">
              {selectedNode.description && (
                <p className="text-gray-600">{selectedNode.description}</p>
              )}

              {selectedNode.responsibilities && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">职责</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedNode.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedNode.requirements && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">要求</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedNode.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
            </div>
          )}
      </Modal>
    </div>
  );
}

// 3. 最后导出主组件
export default function CareerPath() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCompanySelect = useCallback(async (companyId: string) => {
    setSelectedCompany(companyId);
    setLoading(true);
    try {
      const company = categories
        .flatMap(cat => cat.companies)
        .find(c => c.id === companyId);
      
      if (company) {
        const results = await searchCompanyInfo(company.name);
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleViewStructure = useCallback(() => {
    setShowGraph(true);
  }, []);

  const handleNodeClick = useCallback((node: Node<NodeData>) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {!selectedCategory ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-12">选择领域</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  {...category}
                  onClick={() => setSelectedCategory(category.id)}
                  onCompanySelect={handleCompanySelect}
                />
              ))}
            </div>
          </>
        ) : !showGraph ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {searchResults.map((result, index) => (
              <CompanyInfoCard
                key={index}
                result={result}
                onViewStructure={handleViewStructure}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <GraphToolbar
              onZoomIn={() => {/* 实现缩放功能 */}}
              onZoomOut={() => {/* 实现缩放功能 */}}
              onFitView={() => {/* 实现适应屏幕功能 */}}
              onReset={() => {/* 实现重置功能 */}}
              searchTerm=""
              onSearch={() => {/* 实现搜索功能 */}}
              selectedType=""
              onTypeChange={() => {/* 实现类型切换功能 */}}
              nodeTypes={[]}
            />
            <CareerGraph
              initialNodes={[]}
              initialEdges={[]}
              onNodeClick={handleNodeClick}
            />
          </div>
        )}
      </div>

      <NodeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        node={selectedNode?.data ?? null}
      />
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  companies: { id: string; name: string; }[];
  onClick: () => void;
  onCompanySelect: (id: string) => void;
}

function CategoryCard({ 
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
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
          {icon}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="space-y-3">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => {
              onClick();
              onCompanySelect(company.id);
            }}
            className="flex items-center w-full p-3 text-left text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 mr-3" />
            <span className="flex-1">{company.name}</span>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

interface CompanyStructureProps {
  type: 'entity' | 'finance';
  companies: Record<string, OrgStructure>;
  selectedCompany: string | null;
  onSelectCompany: (companyId: string) => void;
  onBack: () => void;
}

function CompanyStructure({ 
  type, 
  companies, 
  selectedCompany, 
  onSelectCompany, 
  onBack 
}: CompanyStructureProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
        返回
      </button>

      {!selectedCompany ? (
        <>
          <h2 className="text-2xl font-bold mb-8">
            {type === 'entity' ? '医疗实体企业' : '医疗金融机构'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(companies).map(([id, company]) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => onSelectCompany(id)}
              >
                <h3 className="text-xl font-bold mb-2">{company.title}</h3>
                <p className="text-gray-600">{company.description}</p>
                <div className="mt-4 text-purple-600">
                  查看组织架构 <ChevronRight className="inline-block ml-1 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <CompanyDetail
          company={companies[selectedCompany]}
          onBack={() => onSelectCompany('')}
        />
      )}
    </div>
  );
}

interface CompanyDetailProps {
  company: OrgStructure;
  onBack: () => void;
}

// 辅助函数：计算节点的水平位置
function calculateHorizontalPosition(
  node: Node,
  allNodes: Node[],
  nodeWidth: number,
  spacing: number
): number {
  const siblings = allNodes.filter(n => 
    n.data.type === node.data.type && 
    n !== node
  );
  
  const index = siblings.indexOf(node);
  const totalWidth = (siblings.length + 1) * (nodeWidth + spacing);
  const startX = -totalWidth / 2;
  
  return startX + (index + 1) * (nodeWidth + spacing);
}

// 添加 TypeSelection 组件
function TypeSelection({ onSelectType, onSelectCompany }: TypeSelectionProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">选择发展方向</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <CategoryCard
          title="医疗实体"
          icon={<Building className="w-8 h-8" />}
          description="医疗器械和医疗技术公司"
          companies={[
            { id: "medtronic", name: "美敦力 (Medtronic)" },
            { id: "jnj", name: "强生 (Johnson & Johnson)" },
            { id: "stryker", name: "史赛克 (Stryker)" },
            { id: "philips", name: "飞利浦医疗 (Philips)" }
          ]}
          onClick={() => onSelectType('entity')}
          onCompanySelect={onSelectCompany}
        />
        <CategoryCard
          title="医疗金融"
          icon={<LineChart className="w-8 h-8" />}
          description="医疗投资和金融机构"
          companies={[
            { id: "qiming", name: "启明创投" },
            { id: "cb", name: "康桥资本" },
            { id: "hillhouse", name: "高瓴资本" },
            { id: "sequoia", name: "红杉资本中国" }
          ]}
          onClick={() => onSelectType('finance')}
          onCompanySelect={onSelectCompany}
        />
      </div>
    </div>
  );
}

// 更新 TypeSelection 组件的 props 接口
interface TypeSelectionProps {
  onSelectType: (type: 'entity' | 'finance') => void;
  onSelectCompany: (id: string) => void;
}

// 定义类别数据
const categories = [
  {
    id: 'entity',
    title: '医疗实体',
    icon: <Building className="w-8 h-8" />,
    description: '探索医疗器械、制药等实体企业的组织架构和职业发展路径',
    companies: [
      { id: 'medtronic', name: '美敦力' },
      { id: 'jnj', name: '强生' },
      { id: 'roche', name: '罗氏' },
      { id: 'philips', name: '飞利浦医疗' }
    ]
  },
  {
    id: 'finance',
    title: '医疗金融',
    icon: <LineChart className="w-8 h-8" />,
    description: '了解医疗基金、投资机构等金融领域的岗位体系',
    companies: [
      { id: 'sequoia', name: '红杉资本' },
      { id: 'hillhouse', name: '高瓴资本' },
      { id: 'qiming', name: '启明创投' },
      { id: 'lilly_asia', name: '礼来亚洲基金' }
    ]
  }
];

// 定义类型
interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  companies: Array<{
    id: string;
    name: string;
  }>;
}