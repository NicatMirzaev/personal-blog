module.exports = {
  API_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'http://localhost:4000',
};
