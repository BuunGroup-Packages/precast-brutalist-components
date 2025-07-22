// Brutalist SVG Shapes
// Import these SVG files directly or use them as React components

export const shapes = {
  square: '/shapes/BrutalSquare.svg',
  triangle: '/shapes/BrutalTriangle.svg',
  circle: '/shapes/BrutalCircle.svg',
  diamond: '/shapes/BrutalDiamond.svg',
  hexagon: '/shapes/BrutalHexagon.svg',
  arrow: '/shapes/BrutalArrow.svg',
  cross: '/shapes/BrutalCross.svg',
  star: '/shapes/BrutalStar.svg',
  lightning: '/shapes/BrutalLightning.svg',
  octagon: '/shapes/BrutalOctagon.svg',
} as const

export const shapesList = [
  {
    name: 'Square',
    id: 'square',
    file: 'BrutalSquare.svg',
    description: 'Classic brutalist square with thick borders'
  },
  {
    name: 'Triangle',
    id: 'triangle', 
    file: 'BrutalTriangle.svg',
    description: 'Sharp angular triangle with bold edges'
  },
  {
    name: 'Circle',
    id: 'circle',
    file: 'BrutalCircle.svg', 
    description: 'Solid circle with contrasting inner border'
  },
  {
    name: 'Diamond',
    id: 'diamond',
    file: 'BrutalDiamond.svg',
    description: 'Rotated square creating diamond shape'
  },
  {
    name: 'Hexagon',
    id: 'hexagon',
    file: 'BrutalHexagon.svg',
    description: 'Six-sided polygon with clean geometry'
  },
  {
    name: 'Arrow',
    id: 'arrow',
    file: 'BrutalArrow.svg',
    description: 'Directional arrow for navigation and flow'
  },
  {
    name: 'Cross',
    id: 'cross',
    file: 'BrutalCross.svg',
    description: 'Plus/cross shape for icons and UI elements'
  },
  {
    name: 'Star',
    id: 'star',
    file: 'BrutalStar.svg',
    description: 'Five-pointed star with sharp angles'
  },
  {
    name: 'Lightning',
    id: 'lightning',
    file: 'BrutalLightning.svg',
    description: 'Jagged lightning bolt for energy and power'
  },
  {
    name: 'Octagon',
    id: 'octagon',
    file: 'BrutalOctagon.svg',
    description: 'Eight-sided stop sign inspired shape'
  }
] as const

export type ShapeId = keyof typeof shapes
export type ShapeInfo = typeof shapesList[number]