export const env = {
  api: import.meta.env.VITE_API,
  url: import.meta.env.VITE_URL,
} as {
  api: string;
  url: string;
};
