export declare const shapes: {
    readonly square: "/shapes/BrutalSquare.svg";
    readonly triangle: "/shapes/BrutalTriangle.svg";
    readonly circle: "/shapes/BrutalCircle.svg";
    readonly diamond: "/shapes/BrutalDiamond.svg";
    readonly hexagon: "/shapes/BrutalHexagon.svg";
    readonly arrow: "/shapes/BrutalArrow.svg";
    readonly cross: "/shapes/BrutalCross.svg";
    readonly star: "/shapes/BrutalStar.svg";
    readonly lightning: "/shapes/BrutalLightning.svg";
    readonly octagon: "/shapes/BrutalOctagon.svg";
};
export declare const shapesList: readonly [{
    readonly name: "Square";
    readonly id: "square";
    readonly file: "BrutalSquare.svg";
    readonly description: "Classic brutalist square with thick borders";
}, {
    readonly name: "Triangle";
    readonly id: "triangle";
    readonly file: "BrutalTriangle.svg";
    readonly description: "Sharp angular triangle with bold edges";
}, {
    readonly name: "Circle";
    readonly id: "circle";
    readonly file: "BrutalCircle.svg";
    readonly description: "Solid circle with contrasting inner border";
}, {
    readonly name: "Diamond";
    readonly id: "diamond";
    readonly file: "BrutalDiamond.svg";
    readonly description: "Rotated square creating diamond shape";
}, {
    readonly name: "Hexagon";
    readonly id: "hexagon";
    readonly file: "BrutalHexagon.svg";
    readonly description: "Six-sided polygon with clean geometry";
}, {
    readonly name: "Arrow";
    readonly id: "arrow";
    readonly file: "BrutalArrow.svg";
    readonly description: "Directional arrow for navigation and flow";
}, {
    readonly name: "Cross";
    readonly id: "cross";
    readonly file: "BrutalCross.svg";
    readonly description: "Plus/cross shape for icons and UI elements";
}, {
    readonly name: "Star";
    readonly id: "star";
    readonly file: "BrutalStar.svg";
    readonly description: "Five-pointed star with sharp angles";
}, {
    readonly name: "Lightning";
    readonly id: "lightning";
    readonly file: "BrutalLightning.svg";
    readonly description: "Jagged lightning bolt for energy and power";
}, {
    readonly name: "Octagon";
    readonly id: "octagon";
    readonly file: "BrutalOctagon.svg";
    readonly description: "Eight-sided stop sign inspired shape";
}];
export type ShapeId = keyof typeof shapes;
export type ShapeInfo = typeof shapesList[number];
