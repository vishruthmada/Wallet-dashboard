export interface Reward {
  id: number;
  title: string;
  description: string;
  coins: number;
}

export const rewards: Reward[] = [
  {
    id: 1,
    title: "₹100 Cashback",
    description: "Get ₹100 cashback on your wallet.",
    coins: 600,
  },
  {
    id: 2,
    title: "Amazon ₹100 Voucher",
    description: "Redeem a ₹100 Amazon shopping voucher.",
    coins: 700,
  },
  {
    id: 3,
    title: "Swiggy ₹100 Voucher",
    description: "Redeem a ₹100 Swiggy food voucher.",
    coins: 650,
  },
  {
    id: 4,
    title: "Movie Ticket",
    description: "Redeem one standard movie ticket.",
    coins: 800,
  },
  {
    id: 5,
    title: "Starbucks Voucher",
    description: "Redeem a Starbucks voucher.",
    coins: 500,
  },
];
