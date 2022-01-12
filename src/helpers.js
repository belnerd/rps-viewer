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
  // Check for RPS winner
  checkWinner(a, b) {
    if (a === b) {
      return 'TIE';
    }
    // PAPER
    if (a === 'PAPER') {
      if (b === 'ROCK') {
        return 'A'
      } else if (b === 'SCISSORS') {
        return 'B'
      }
    }
    // ROCK
    if (a === 'ROCK') {
      if (b === 'SCISSORS') {
        return 'A'
      } else if (b === 'PAPER') {
        return 'B'
      }
    }
    // SCISSORS
    if (a === 'SCISSORS') {
      if (b === 'PAPER') {
        return 'A'
      } else if (b === 'ROCK') {
        return 'B'
      }
    }
  },
};
