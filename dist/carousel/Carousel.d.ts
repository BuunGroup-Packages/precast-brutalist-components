import React from 'react';
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'brutal' | 'outline';
}
interface CarouselContentProps {
    children?: React.ReactNode;
    className?: string;
}
interface CarouselControlsProps {
    children?: React.ReactNode;
    className?: string;
}
interface CarouselPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}
interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}
interface CarouselIndicatorsProps {
    children?: React.ReactNode;
    className?: string;
}
declare const CarouselComponent: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>> & {
    Content: React.ForwardRefExoticComponent<CarouselContentProps & React.RefAttributes<HTMLDivElement>>;
    Controls: React.ForwardRefExoticComponent<CarouselControlsProps & React.RefAttributes<HTMLDivElement>>;
    Previous: React.ForwardRefExoticComponent<CarouselPreviousProps & React.RefAttributes<HTMLButtonElement>>;
    Next: React.ForwardRefExoticComponent<CarouselNextProps & React.RefAttributes<HTMLButtonElement>>;
    Indicators: React.ForwardRefExoticComponent<CarouselIndicatorsProps & React.RefAttributes<HTMLDivElement>>;
};
export { CarouselComponent as Carousel };
export type { CarouselProps, CarouselContentProps, CarouselControlsProps, CarouselPreviousProps, CarouselNextProps, CarouselIndicatorsProps };
