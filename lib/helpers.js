import fetch from 'isomorphic-fetch';
import { getValue } from './store';
import { API_URL } from './config';

export const makeRequest = async (url, method, body) => {
  return fetch(API_URL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getValue('token')}`,
    },
    body,
  }).then((data) => {
    return data.json();
  });
};

export const kFormatter = (num) => {
  if (num < 1000) {
    return `${num}`;
  }

  const base = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));
  const suffix = 'kmb'[base - 1];
  const abbrev = String(num / 1000 ** base).substring(0, 3);
  return (abbrev.endsWith('.') ? abbrev.slice(0, -1) : abbrev) + suffix;
};

export const categoryConvertTurkishToEnglish = (category) => {
  switch (category) {
    case 'Bilim': {
      return 'Science';
    }
    case 'Oyun': {
      return 'Game';
    }
    case 'Teknoloji': {
      return 'Technologie';
    }
    case 'Mobil': {
      return 'Mobile';
    }
    case 'Yazılım': {
      return 'Software';
    }
  }
  return category;
};
