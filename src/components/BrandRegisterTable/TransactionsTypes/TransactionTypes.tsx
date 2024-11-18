import { FaCreditCard } from "react-icons/fa";

export type TransactionStatus = "registered" | "in_process";
export type TransactionSalesType = "PAYMENT_LINK" | "TERMINAL";
export type TransactionPaymentMethods =
  | "NEQUI"
  | "PSE"
  | "BANCOLOMBIA"
  | "DAVIPLATA"
  | "CARD";

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

export const txSalesTypeObject: Record<
  TransactionSalesType,
  { value: string; label: string; modalLabel: string; icon: JSX.Element }
> = {
  PAYMENT_LINK: {
    value: "PAYMENT_LINK",
    label: "Cobro con link de pago",
    modalLabel: "Link de pagos",
    icon: (
      <img
        src="/images/link.png"
        alt="pse_payment_img"
        style={{ width: 40, height: 40, zoom: 0.8, objectFit: "contain" }}
      />
    ),
  },
  TERMINAL: {
    value: "TERMINAL",
    label: "Cobro con datafono",
    modalLabel: "Datafono",
    icon: (
      <img
        src="/images/terminal.png"
        alt="terminal_payment_img"
        style={{ width: 40, height: 40, zoom: 0.8, objectFit: "contain" }}
      />
    ),
  },
};

export const txPaymentMethodsObject: Record<
  TransactionPaymentMethods,
  { value: string; label: string; icon: JSX.Element }
> = {
  CARD: {
    value: "CARD",
    label: "Tarjeta de Crédito/Débito",
    icon: <FaCreditCard style={{ color: "var(--color-blue)", width: 40 }} />,
  },
  PSE: {
    value: "PSE",
    label: "PSE",
    icon: <img src="/icons/pse.svg" alt="PSE" style={{ width: 30 }} />,
  },
  DAVIPLATA: {
    value: "DAVIPLATA",
    label: "Daviplata",
    icon: (
      <img
        src="/icons/daviplata.svg"
        alt="Daviplata"
        style={{ width: 40, objectFit: "contain", height: 30 }}
      />
    ),
  },
  NEQUI: {
    value: "NEQUI",
    label: "Nequi",
    icon: (
      <img
        src="/icons/nequi.svg"
        alt="Nequi"
        style={{ width: 40, objectFit: "contain", height: 30 }}
      />
    ),
  },
  BANCOLOMBIA: {
    value: "BANCOLOMBIA",
    label: "Bancolombia",
    icon: (
      <img
        src="/icons/bancolombia.svg"
        alt="Bancolombia"
        style={{ width: 40, objectFit: "contain", height: 30 }}
      />
    ),
  },
};
