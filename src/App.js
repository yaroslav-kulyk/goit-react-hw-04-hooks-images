import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalURL, setModalURL] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setIsSearch(true);
  };

  const onLoadMore = () => {
    setPage(state => state + 1);
    setIsSearch(false);
  };

  const showModalFunc = url => {
    setShowModal(true);
    setModalURL(url);
  };

  return (
    <div>
      <ToastContainer autoClose={2500} />
      {showModal && <Modal url={modalURL} showModal={setShowModal} />}
      <Searchbar onSubmit={onSearch} />
      <ImageGallery
        query={searchQuery}
        page={page}
        onImageClick={showModalFunc}
        showButton={setShowButton}
        newSearch={isSearch}
      />
      {showButton && <Button onClick={onLoadMore} />}
    </div>
  );
}
