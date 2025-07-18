export { 
  TableOfContents,
  TableOfContentsList,
  TableOfContentsItem, 
  TableOfContentsLink 
} from './TableOfContents'
export type { 
  TableOfContentsProps, 
  TableOfContentsListProps, 
  TableOfContentsItemProps, 
  TableOfContentsLinkProps,
  TableOfContentsComponent 
} from './TableOfContents'

// Re-export the TableOfContents with proper typing for subcomponents
export { TableOfContents as default } from './TableOfContents'