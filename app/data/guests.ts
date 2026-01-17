export type Guest = {
  phone: string;
  name: string;
  persons: number;
  withFamily?: boolean;
  invitedTo: string[]; // e.g. ["Mehndi","Barat","Walima"]
};

export const GUESTS: Guest[] = [
  {
    phone: "03001234567",
    name: "Ali Raza",
    persons: 4,
    withFamily: true,
    invitedTo: ["Mehndi", "Walima"],
  },
  {
    phone: "03123456789",
    name: "Usman",
    persons: 2,
    withFamily: false,
    invitedTo: ["Barat"],
  },
];
