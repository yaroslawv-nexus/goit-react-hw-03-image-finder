import React from 'react';
import { GalleryItemStyled, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  imageURL,
  bigImageURL,
  onClickItem,
  description,
}) => {
  return (
    <GalleryItemStyled
      onClick={e => {
        onClickItem(bigImageURL);
      }}
    >
      <GalleryImage src={imageURL} alt={description} />
    </GalleryItemStyled>
  );
};
