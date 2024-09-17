export const getMenuItems = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const response = await fetch(`http://212.67.15.42:3000/api`);
  return response.json();
};
