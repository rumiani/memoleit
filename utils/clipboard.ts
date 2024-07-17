export const getHighlightedText = async (): Promise<string | null> => {
    try {
      if (navigator.clipboard) {
        return await navigator.clipboard.readText();
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
    return null;
  };
  