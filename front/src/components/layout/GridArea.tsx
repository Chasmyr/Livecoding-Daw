import { ReactNode } from "react";

interface GridAreaProps {
  children?: ReactNode | ReactNode[];
}

export function GridArea({ children }: GridAreaProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
     <div className="grid grid-cols-2 gap-4 mt-4 mx-4 auto-rows-min">
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className="rounded-xl shadow-md">
              {child}
            </div>
          ))
        : <div className="rounded-xl shadow-md">{children}</div>
      }
    </div>
  );
}
