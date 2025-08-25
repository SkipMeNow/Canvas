// useTheme.js
export const useTheme = () => {
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };
  return { toggleTheme };
};
