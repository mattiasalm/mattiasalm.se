//
// Async fetch content from URL and return as text
const getHtmlFromUrl = async url => {
  const response = await fetch(url);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('File not found');
  }
  return await response.text();
}

export default {
  getHtmlFromUrl,
};
