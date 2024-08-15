export interface CustomError extends Error {
  options?: {
    name: string;
  };
}

export interface RequestWithUserId extends Request {
  query: {
    [key: string]: string | undefined;
  };
  user: { id: number };
  headers: {
    authorization?: string;
  } & Request['headers'];
}
