export default {
  //
  // Async fetch content from URL and return as text
  async getHtmlFromUrl(url) {
    const response = await fetch(url);
    if (response.status >= 400 && response.status < 600) {
      throw new Error('File not found');
    }
    return await response.text();
  },
};
