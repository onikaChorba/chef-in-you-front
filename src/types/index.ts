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
  _id: string,
  title: string,
  text: string,
  imageUrl: string,
  tags: Array<string>,
  user: string,
}