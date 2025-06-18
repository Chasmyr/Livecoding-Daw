import { ReactNode } from "react";

interface GridAreaProps {
  children?: ReactNode | ReactNode[];
}

export function GridArea({ children }: GridAreaProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mx-4">
      {items.map((child, index) => (
        <div key={index} className="rounded-xl shadow-md">
          {child}
        </div>
      ))}
    </div>
  );
}
