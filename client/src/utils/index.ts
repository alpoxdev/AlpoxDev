import axios, { AxiosInstance } from 'axios';
import { getSnapshot } from 'mobx-state-tree';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

import jwtDecode from 'jwt-decode';

import { IStore } from 'stores';

export const isSSR = () => {
  return typeof window === 'undefined';
};

export const onGetDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  if (!date) return '';

  //   const minutes = date.getMinutes();
  //   const hour = date.getHours();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let stringMonth = `${month}`;
  let stringDay = `${day}`;
  //   const stringHour = `${hour}`;
  //   const stringMinutes = `${minutes}`;

  if (month < 10) stringMonth = `0${month}`;
  if (day < 10) stringDay = `0${day}`;
  //   if (hour < 10) stringHour = `0${hour}`;
  //   if (minutes < 10) stringMinutes = `0${minutes}`;

  return `${year}년 ${stringMonth}월 ${stringDay}일`;
};

export const deleteUndefinedInStore = (store: IStore): void => {
  return JSON.parse(JSON.stringify(getSnapshot(store)));
};

export const onParseMarkdown = (content: string): undefined | string => {
  let parsed: undefined | string;

  unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)
    .process(content, function (err, file) {
      parsed = String(file);
    });

  return parsed;
};

export const onParseJWT = (accessToken: string): any => {
  return jwtDecode(accessToken);
};

export const onCreateAxiosInstanceWithToken = (accessToken: string): AxiosInstance => {
  return axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
