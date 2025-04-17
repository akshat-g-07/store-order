import { cn } from "@/lib/utils";

export default function OrderItemHeader({ orderID, status, user, createdAt }) {
  return (
    <div className="flex flex-col items-start font-normal space-y-1">
      <p className="order-title text-base font-bold">
        Order No:&nbsp;{orderID.split("aa")[1]}
      </p>

      <p>
        Status:&nbsp;
        <span
          className={cn(
            "font-medium",
            status === "CONFIRMED"
              ? "text-brand-primaryYellow"
              : "text-brand-primaryGreen"
          )}
        >
          {status}
        </span>
      </p>

      {user?.userName && user?.phoneNumber && (
        <p className="text-xs">
          <span className="opacity-50">by:&nbsp;</span>
          {user.userName}, {user.phoneNumber}
        </p>
      )}

      <p className="text-xs opacity-50">
        on:&nbsp;
        {new Date(createdAt).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
    </div>
  );
}
