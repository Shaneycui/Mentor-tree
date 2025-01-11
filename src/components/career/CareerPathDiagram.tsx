import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { CareerPath } from '../../types/career';

interface Props {
  careerPath: CareerPath;
}

export default function CareerPathDiagram({ careerPath }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !careerPath.stages.length) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // Clear previous content
    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleLinear()
      .domain([0, careerPath.stages.length - 1])
      .range([margin.left, width - margin.right]);

    // Draw connecting lines
    const line = d3.line<any>()
      .x((_, i) => x(i))
      .y(() => height / 2);

    svg.append('path')
      .datum(careerPath.stages)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', line as any);

    // Draw nodes
    const nodes = svg.selectAll('.node')
      .data(careerPath.stages)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (_, i) => `translate(${x(i)},${height / 2})`);

    nodes.append('circle')
      .attr('r', 8)
      .attr('fill', '#10b981');

    nodes.append('text')
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm font-medium')
      .text(d => d.title);

  }, [careerPath]);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full" />
    </div>
  );
}