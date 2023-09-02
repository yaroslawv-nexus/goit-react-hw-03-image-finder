import React from 'react';
import { GalleryItemStyled, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageURL, bigImageURL }) => {
  return (
    <GalleryItemStyled>
      <GalleryImage src={imageURL} alt="image" />
    </GalleryItemStyled>
  );
};
