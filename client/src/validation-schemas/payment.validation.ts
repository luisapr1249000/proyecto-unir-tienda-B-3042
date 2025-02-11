import { z } from "zod";

export const paymentSchema = z.object({
  name: z.string(),
  cardNumber: z.string().regex(/^[0-9]{16}$/, {
    message: "El número de tarjeta debe tener 16 dígitos",
  }),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: "La fecha de expiración debe estar en formato MM/YY",
  }),
  cvv: z
    .string()
    .regex(/^[0-9]{3,4}$/, { message: "El CVV debe tener 3 o 4 dígitos" }),
});
