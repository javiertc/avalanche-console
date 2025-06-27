type StatusType = "success" | "error" | "info" | "warning";

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case "success":
      return "text-green-600 dark:text-green-400";
    case "error":
      return "text-red-600 dark:text-red-400";
    case "warning":
      return "text-yellow-600 dark:text-yellow-400";
    default:
      return "text-blue-600 dark:text-blue-400";
  }
};

export const getStatusBg = (status: StatusType) => {
  switch (status) {
    case "success":
      return "bg-green-50 dark:bg-green-500/10";
    case "error":
      return "bg-red-50 dark:bg-red-500/10";
    case "warning":
      return "bg-yellow-50 dark:bg-yellow-500/10";
    default:
      return "bg-blue-50 dark:bg-blue-500/10";
  }
};

export const getStatusVariant = (status: StatusType) => {
  switch (status) {
    case "success":
      return "secondary";
    case "error":
      return "destructive";
    case "warning":
      return "outline";
    default:
      return "default";
  }
}; 