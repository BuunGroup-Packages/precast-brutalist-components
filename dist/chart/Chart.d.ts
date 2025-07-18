import React from 'react';
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'brutal' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showBorder?: boolean;
    showShadow?: boolean;
    showGrid?: boolean;
    aspectRatio?: string;
    height?: number | string;
}
interface ChartHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
interface ChartTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
}
interface ChartSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
}
interface ChartContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: 'top' | 'bottom' | 'left' | 'right';
    children?: React.ReactNode;
}
interface ChartFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
declare const ChartComponent: React.ForwardRefExoticComponent<ChartProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<ChartHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<ChartTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Subtitle: React.ForwardRefExoticComponent<ChartSubtitleProps & React.RefAttributes<HTMLParagraphElement>>;
    Content: React.ForwardRefExoticComponent<ChartContentProps & React.RefAttributes<HTMLDivElement>>;
    Legend: React.ForwardRefExoticComponent<ChartLegendProps & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<ChartFooterProps & React.RefAttributes<HTMLDivElement>>;
};
export { ChartComponent as Chart };
export type { ChartProps, ChartHeaderProps, ChartTitleProps, ChartSubtitleProps, ChartContentProps, ChartLegendProps, ChartFooterProps };
