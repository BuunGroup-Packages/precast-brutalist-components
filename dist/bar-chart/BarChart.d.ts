import React from 'react';
interface BarChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
interface BarChartProps {
    data: BarChartDataPoint[];
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
    className?: string;
    style?: React.CSSProperties;
}
declare const BarChart: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<HTMLDivElement>>;
export { BarChart };
export type { BarChartProps, BarChartDataPoint };
