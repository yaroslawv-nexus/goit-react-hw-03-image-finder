import React, { Component } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  closeModalEsc = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  closeClickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, description } = this.props;
    return (
      <Overlay onClick={this.closeClickOverlay}>
        <ModalStyle>
          <img src={largeImageURL} alt={description} />
        </ModalStyle>
      </Overlay>
    );
  }
}
