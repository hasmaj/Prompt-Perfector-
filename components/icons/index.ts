// FIX: Replaced JSX with React.createElement to make the code valid TypeScript in a .ts file.
import React from 'react';

export const WandSparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "m22 2-7 20-4-9-9-4Z" }),
    React.createElement('path', { d: "M13 2 3 22" }),
    React.createElement('path', { d: "M6 18h.01" }),
    React.createElement('path', { d: "M2 6h.01" }),
    React.createElement('path', { d: "M18 6h.01" }),
    React.createElement('path', { d: "M20 2h.01" }),
    React.createElement('path', { d: "M12 2v.01" })
  )
);

export const LoaderCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "M21 12a9 9 0 1 1-6.219-8.56" })
  )
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "m6 9 6 6 6-6" })
  )
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }),
    React.createElement('path', { d: "M9 18h6" }),
    React.createElement('path', { d: "M10 22h4" })
  )
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('rect', { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }),
    React.createElement('path', { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" })
  )
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "M5 12h14" }),
    React.createElement('path', { d: "M12 5v14" })
  )
);
