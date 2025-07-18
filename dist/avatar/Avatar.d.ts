import React, { ImgHTMLAttributes } from 'react';
export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'children'> {
    /** Image source URL */
    src?: string;
    /** Alt text for the image */
    alt?: string;
    /** Initials to display when no image */
    initials?: string;
    /** Icon to display as fallback */
    icon?: React.ReactNode;
    /** Avatar size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Status indicator */
    status?: 'online' | 'offline' | 'busy' | 'away';
    /** Additional CSS classes */
    className?: string;
    /** Custom click handler */
    onClick?: () => void;
    /** Whether the avatar is clickable */
    clickable?: boolean;
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
