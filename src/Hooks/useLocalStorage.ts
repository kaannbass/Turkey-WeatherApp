const useLocalStorage = (key: string) => {
    const getItem = () => {
      const storage = localStorage.getItem(key);
      if (storage) {
        return JSON.parse(storage);
      }
    };
  
    const setItem = (value: Array<string>) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const removeItem = () => {
      localStorage.removeItem(key);
    };
  
    return { getItem, setItem, removeItem };
  };
  
  export default useLocalStorage;
  