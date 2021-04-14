import moment from 'moment';

export const fromNow = (date) => moment.unix(date / 1000).fromNow();
