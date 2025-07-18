import React from 'react';
interface PieChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
interface PieChartProps {
    data: PieChartDataPoint[];
    title?: string;
    subtitle?: string;
    size?: number;
    showValues?: boolean;
    showLabels?: boolean;
    animated?: boolean;
    variant?: 'default' | 'minimal' | 'brutal';
    showContainer?: boolean;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
    strokeWidth?: number;
    className?: string;
    style?: React.CSSProperties;
}
declare const PieChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<HTMLDivElement>>;
export { PieChart };
export type { PieChartProps, PieChartDataPoint };
