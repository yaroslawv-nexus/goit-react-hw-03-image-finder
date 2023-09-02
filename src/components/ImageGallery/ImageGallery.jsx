import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { GalleryStyled } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, onClickItem, description }) => {
  return (
    <GalleryStyled>
      {gallery.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            imageURL={webformatURL}
            bigImageURL={largeImageURL}
            onClickItem={onClickItem}
            description={description}
          />
        );
      })}
    </GalleryStyled>
  );
};
