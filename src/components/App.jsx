import { getImages } from 'api';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Layout } from './Layout';
import PuffLoader from 'react-spinners/ClipLoader';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    value: '',
    gallery: [],
    page: 1,
    loader: false,
    error: false,
    modalOpen: false,
    modalURL: '',
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value) {
      this.setState({ loader: true, page: 1, error: false });
      try {
        const images = await getImages(value);
        if (images.data.hits.length === 0) {
          throw new Error();
        }
        this.setState({ gallery: images.data.hits });
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oops. Error');
      } finally {
        this.setState({ loader: false });
      }
    } else if (page !== prevState.page && page !== 1) {
      this.setState({ loader: true, error: false });
      try {
        const images = await getImages(value, page);
        if (images.data.hits.length === 0) {
          throw new Error();
        }
        this.setState({ gallery: [...prevState.gallery, ...images.data.hits] });
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oops. Error');
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  getSearchWord = value => {
    this.setState({ value: value });
  };

  onNextPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
    window.addEventListener('keydown', this.closeModalEsc);
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
    window.removeEventListener('keydown', this.closeModalEsc);
  };

  closeModalEsc = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  onClickItem = url => {
    this.openModal();
    this.setState({ modalURL: url });
  };

  render() {
    const { gallery, loader, error, modalOpen, modalURL } = this.state;
    return (
      <Layout>
        <Searchbar submitSearch={this.getSearchWord} />
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onClickItem={this.onClickItem} />
        )}
        {gallery.length > 0 && !loader && <Button onClick={this.onNextPage} />}
        {loader && !error && <PuffLoader />}
        {modalOpen && (
          <Modal largeImageURL={modalURL} onCloseModal={this.closeModal} />
        )}
        <Toaster position="top-right" />
      </Layout>
    );
  }
}
