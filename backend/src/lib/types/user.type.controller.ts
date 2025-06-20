export type UserPayload = {
  username: string;
  id: number;
  jwtOrigin: string;
  exp: number;
};

export type Variables = {
  user: UserPayload;
};
