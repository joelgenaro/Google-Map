export const areAllPropsBlank = (obj: any): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined && value !== null && value !== '') {
        return false;
      }
    }
  }
  return true;
};
