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
    const { value, page, gallery } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.setState({ loader: true, error: false });
      try {
        const images = await getImages(value, page);
        if (images.data.hits.length === 0) {
          throw new Error();
        }
        this.setState({ gallery: [...gallery, ...images.data.hits] });
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oops. Error');
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  goSearch = value => {
    if (value === '') {
      return;
    }
    this.setState({ value: value, page: 1, gallery: [] });
  };

  onNextPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  onClickItem = url => {
    this.openModal();
    this.setState({ modalURL: url });
  };

  render() {
    const { gallery, loader, error, modalOpen, modalURL, value } = this.state;
    return (
      <Layout>
        <Searchbar submitSearch={this.goSearch} />
        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            onClickItem={this.onClickItem}
            description={value}
          />
        )}
        {gallery.length > 0 && !loader && <Button onClick={this.onNextPage} />}
        {loader && !error && <PuffLoader />}
        {modalOpen && (
          <Modal
            largeImageURL={modalURL}
            onCloseModal={this.closeModal}
            description={value}
          />
        )}
        <Toaster position="top-right" />
      </Layout>
    );
  }
}
