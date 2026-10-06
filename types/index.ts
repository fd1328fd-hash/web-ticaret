// types/index.ts

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  city?: string | null;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  parentId?: string | null;
  children?: Category[];
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  district?: string | null;
  images: string;
  status: string;
  views: number;
  createdAt: Date;
  user?: User;
  category?: Category;
};

export type VitrinIlan = {
  id: number;
  baslik: string;
  konum: string;
  fiyat: string;
  resim: string;
};