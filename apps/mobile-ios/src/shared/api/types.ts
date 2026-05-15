export type ApiError = {
  code: string;
  message: string | string[];
  details?: unknown;
  requestId?: string;
};

export type ApiErrorResponse = {
  error: ApiError;
};
