export const getAllCategories = async () => {
    const response = await fetch(`http://212.67.15.42:3000/api/category`);
    return response.json();
} 