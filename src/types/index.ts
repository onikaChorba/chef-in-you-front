export type LoginParams = {
  email: string;
  password: string;
}

export type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export type TUser = {
  email: string,
  fullName: string,
  passwordHash: string,
  avatarUrl?: string | null;
}

export type TRecipe = {
  _id?: string,
  createdAt?: string,
  title: string,
  description: string,
  servings: number,
  time: string,
  tags: Array<string> | string,
  ingredients: string[],
  instructions: string[],
  user?: string,
  imageUrl?: string,
  viewsCount?: Number
}