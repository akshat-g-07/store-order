import { cn } from "@/lib/utils";

export default function Error({ className }) {
  return <div className={cn(className)}>Something went wrong :/.</div>;
}
