import React from 'react';
import { LoadMoreBt } from './Button.styled';

export const Button = ({ onClick }) => {
  return <LoadMoreBt onClick={onClick}>Load more</LoadMoreBt>;
};
