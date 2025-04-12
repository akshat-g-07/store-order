import { cn } from "@/lib/utils";

import "./loading.css";

export default function Loading({ className }) {
  return (
    <div className={cn(className)}>
      <span className="loader"></span>
    </div>
  );
}
