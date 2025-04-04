export const scrollToError = (errors: any) => {
  // Function to find the first error path in nested object
  const findFirstErrorPath = (obj: any, parentPath = ''): string | null => {
    if (!obj) return null;

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (value && typeof value === 'object') {
        // If it's an array, check each item
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const arrayPath = `${currentPath}.${i}`;
            const errorPath = findFirstErrorPath(value[i], arrayPath);
            if (errorPath) return errorPath;
          }
        } else {
          // If it's an object, recurse
          const errorPath = findFirstErrorPath(value, currentPath);
          if (errorPath) return errorPath;
        }
      } else if (value) {
        // Found an error message
        return currentPath;
      }
    }
    return null;
  };

  const errorPath = findFirstErrorPath(errors);
  // console.log("errorPath: ", errorPath);

  if (!errorPath) return;

    // Remove .message from the path if it exists
  const fieldPath = errorPath.replace('.message', '');

  // Try different selectors to find the error element
  const selectors = [
    `[name="${fieldPath}"]`,
    `[name="${fieldPath.replace(/\.\d+\./, '.')}"]`,
    `[name$="${fieldPath.split('.').pop()}"]`
  ];
  // console.log("selectors: ", selectors);

  let errorElement = null;
  for (const selector of selectors) {
    errorElement = document.querySelector(selector);
    if (errorElement) break;
  }
  // console.log("errorElement: ", errorElement);

  if (errorElement) {
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};