import type { Prisma } from "@prisma/client";

export type { ExtendedSession, ExtendedUser } from "./auth";

export type User = Prisma.UserGetPayload<Record<string, never>>;
export type Story = Prisma.StoryGetPayload<Record<string, never>>;
export type StoryPage = Prisma.StoryPageGetPayload<Record<string, never>>;
export type Product = Prisma.ProductGetPayload<Record<string, never>>;
export type Order = Prisma.OrderGetPayload<Record<string, never>>;
export type OrderItem = Prisma.OrderItemGetPayload<Record<string, never>>;
export type WishlistItem = Prisma.WishlistItemGetPayload<Record<string, never>>;
export type Cart = Prisma.CartGetPayload<Record<string, never>>;
export type CartItem = Prisma.CartItemGetPayload<Record<string, never>>;

export type UserWithStories = Prisma.UserGetPayload<{
  include: { stories: true };
}>;

export type StoryWithPages = Prisma.StoryGetPayload<{
  include: { pages: true };
}>;

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: true };
}>;

export type CartWithItems = Prisma.CartGetPayload<{
  include: { items: true };
}>;

export type {
  Plan,
  Theme,
  StoryStatus,
  ProductCategory,
  OrderStatus,
  PaymentProvider,
  OrderItemType,
  CartItemType,
} from "@prisma/client";
