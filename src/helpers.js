module.exports = {
  // Format date from UNIX timestamp to a human readable format
  formatDate: (date, locale, options) => {
    locale = locale || 'fi';
    options = options || {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(date).toLocaleDateString(locale, options);
  },
};
