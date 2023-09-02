import { getImages } from 'api';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    value: '',
    gallery: [],
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (this.state.value !== prevState.value) {
      getImages(this.state.value).then(({ hits }) => {
        this.setState({ gallery: hits });
      });
    }
  }

  getSearchWord = value => {
    this.setState({ value: value });
  };

  render() {
    const { gallery } = this.state;
    return (
      <>
        <Searchbar submitSearch={this.getSearchWord} />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
      </>
    );
  }
}
