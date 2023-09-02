import React from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ largeImageURL, onCloseModal, description }) => {
  return (
    <Overlay
      onClick={e => {
        if (e.target.nodeName !== 'IMG') {
          onCloseModal(e);
        }
      }}
    >
      <ModalStyle>
        <img src={largeImageURL} alt={description} />
      </ModalStyle>
    </Overlay>
  );
};
