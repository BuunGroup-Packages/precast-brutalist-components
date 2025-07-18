import React from 'react';
interface LineChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
interface LineChartProps {
    data: LineChartDataPoint[];
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
    lineColor?: string;
    lineWidth?: number;
    showDots?: boolean;
    smooth?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<HTMLDivElement>>;
export { LineChart };
export type { LineChartProps, LineChartDataPoint };
