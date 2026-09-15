export const getImageUrl = (image) => {
  const baseUrl = import.meta.env.VITE_API_URL?.replace("/api", "");

  return `${baseUrl}/${image}`;
};
