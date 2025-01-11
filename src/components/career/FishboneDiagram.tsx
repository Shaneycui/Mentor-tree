import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { CareerPathDetail, CareerStageDetail } from '../../types/career';

interface Props {
  careerPath: CareerPathDetail;
  selectedStage: CareerStageDetail | null;
  onStageSelect: (stage: CareerStageDetail) => void;
}

export default function FishboneDiagram({ careerPath, selectedStage, onStageSelect }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (containerRef.current) {
        setIsVertical(containerRef.current.offsetWidth < 768); // md breakpoint
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !careerPath.stages.length) return;

    const svg = d3.select(svgRef.current);
    const width = isVertical ? 400 : 1200;
    const height = isVertical ? 800 : 500;
    const margin = isVertical 
      ? { top: 40, right: 40, bottom: 40, left: 40 }
      : { top: 40, right: 100, bottom: 40, left: 100 };

    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('class', 'font-sans');

    // 绘制主干线
    const mainLine = isVertical
      ? d3.line()([[width/2, margin.top], [width/2, height - margin.bottom]])
      : d3.line()([[margin.left, height/2], [width - margin.right, height/2]]);
    
    svg.append('path')
      .attr('d', mainLine)
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

    // 计算每个阶段的位置
    const stageGap = isVertical
      ? (height - margin.top - margin.bottom) / (careerPath.stages.length - 1)
      : (width - margin.left - margin.right) / (careerPath.stages.length - 1);
    
    careerPath.stages.forEach((stage, i) => {
      const x = isVertical ? width/2 : margin.left + i * stageGap;
      const y = isVertical ? margin.top + i * stageGap : height/2;
      
      const group = svg.append('g')
        .attr('transform', `translate(${x},${y})`)
        .style('cursor', 'pointer')
        .on('click', () => onStageSelect(stage));

      // 节点
      const nodeGroup = group.append('g')
        .attr('class', 'node-group')
        .style('transition', 'transform 0.2s');

      nodeGroup.append('circle')
        .attr('r', 24)
        .attr('fill', selectedStage?.id === stage.id ? '#059669' : '#10b981');

      nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('class', 'text-sm font-bold')
        .text(i + 1);

      // 标题
      group.append('text')
        .attr('x', isVertical ? 40 : 0)
        .attr('y', isVertical ? 0 : -36)
        .attr('text-anchor', isVertical ? 'start' : 'middle')
        .attr('class', 'text-sm font-medium fill-gray-900')
        .text(stage.title);

      // 时间框架
      group.append('text')
        .attr('x', isVertical ? -40 : 0)
        .attr('y', isVertical ? 0 : 36)
        .attr('text-anchor', isVertical ? 'end' : 'middle')
        .attr('class', 'text-xs fill-gray-500')
        .text(stage.timeframe);

      // 职责和技能（简短显示）
      if (stage.responsibilities.length) {
        const topBone = group.append('g')
          .attr('transform', isVertical 
            ? `translate(60,0)` 
            : 'translate(0,-60)');

        topBone.append('text')
          .attr('x', isVertical ? 20 : 0)
          .attr('y', isVertical ? 0 : -4)
          .attr('text-anchor', isVertical ? 'start' : 'middle')
          .attr('class', 'text-xs fill-gray-600')
          .text('核心职责');
      }

      if (stage.required_skills.length) {
        const bottomBone = group.append('g')
          .attr('transform', isVertical 
            ? `translate(-60,0)` 
            : 'translate(0,60)');

        bottomBone.append('text')
          .attr('x', isVertical ? -20 : 0)
          .attr('y', isVertical ? 0 : 14)
          .attr('text-anchor', isVertical ? 'end' : 'middle')
          .attr('class', 'text-xs fill-gray-600')
          .text('必备技能');
      }
    });

  }, [careerPath, selectedStage, isVertical]);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      <svg 
        ref={svgRef} 
        className={`w-full ${isVertical ? 'min-h-[800px]' : 'min-w-[1200px]'}`}
      />
    </div>
  );
} 