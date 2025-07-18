import React from 'react';
interface AreaChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
interface AreaChartProps {
    data: AreaChartDataPoint[];
    title?: string;
    subtitle?: string;
    height?: number;
    showValues?: boolean;
    showGrid?: boolean;
    animated?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'minimal' | 'brutal';
    showContainer?: boolean;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
    fillColor?: string;
    lineColor?: string;
    lineWidth?: number;
    showDots?: boolean;
    smooth?: boolean;
    fillOpacity?: number;
    className?: string;
    style?: React.CSSProperties;
}
declare const AreaChart: React.ForwardRefExoticComponent<AreaChartProps & React.RefAttributes<HTMLDivElement>>;
export { AreaChart };
export type { AreaChartProps, AreaChartDataPoint };
