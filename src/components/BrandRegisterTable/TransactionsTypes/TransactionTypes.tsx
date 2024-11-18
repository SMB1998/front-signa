export type TransactionStatus = "registered" | "in_process";

export const statusObject: Record<
  TransactionStatus,
  { value: string; label: string }
> = {
  registered: {
    value: "registered",
    label: "Registrado",
  },
  in_process: {
    value: "in_process",
    label: "En proceso",
  },
};
