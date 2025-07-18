import React from 'react';
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The aspect ratio to maintain (e.g., 16/9, 4/3, 1/1) */
    ratio?: number;
    /** Content to display within the aspect ratio container */
    children: React.ReactNode;
    /** Whether to apply object-fit to child images/videos */
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    /** Background color when content doesn't fill the container */
    backgroundColor?: string;
}
/**
 * AspectRatio component maintains a specific width-to-height ratio for its content.
 * Useful for responsive images, videos, embeds, and any content that needs consistent dimensions.
 */
export declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;
