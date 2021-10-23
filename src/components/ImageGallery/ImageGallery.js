import { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';
import fetchImages from '../../services/pixabay-api';
import './ImageGallery.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const loaderRoot = document.querySelector('#loader-root');

export default function ImageGallery({
  query,
  page,
  onImageClick,
  showButton,
  newSearch,
}) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }

    if (newSearch) {
      setImages([]);
      showButton(false);
    }

    setStatus(Status.PENDING);

    fetchImages(query, page)
      .then(images => {
        if (!images.length) {
          toast.info('No images found :(');
          setImages(images);
          setStatus(Status.IDLE);
          return;
        }

        setImages(prev => [...prev, ...images]);
        setStatus(Status.RESOLVED);
        showButton(true);
      })
      .catch(error => {
        toast.error(`${error.message}`, {
          theme: 'colored',
        });

        setStatus(Status.REJECTED);
      });
  }, [newSearch, page, query, showButton]);

  useLayoutEffect(() => {
    if (newSearch) {
      return;
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const getLargeImgURL = index => {
    onImageClick(images[index].largeImageURL);
  };

  return (
    <div>
      {status === Status.PENDING &&
        createPortal(
          <div className="loader">
            <Loader type="Grid" color="#3f51b5" height={100} width={100} />
          </div>,
          loaderRoot,
        )}

      <ul className="ImageGallery">
        {images &&
          images.map(({ webformatURL, tags }, index) => {
            return (
              <div key={index}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  tags={tags}
                  onClick={() => getLargeImgURL(index)}
                />
              </div>
            );
          })}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
  showButton: PropTypes.func.isRequired,
  newSearch: PropTypes.bool.isRequired,
};
