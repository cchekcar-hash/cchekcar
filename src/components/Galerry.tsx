import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import scss from './Galerry.module.scss';
import clsx from 'clsx';

export default function Galerry() {
  const imageTrusted = {
    trustedScreenImages: [
      '/assets/photo_1_2025-08-26_12-02-14.jpg',
      '/assets/photo_2_2025-08-26_12-02-14.jpg',
      '/assets/photo_3_2025-08-26_12-02-14.jpg',
      '/assets/photo_4_2025-08-26_12-02-14.jpg',
      '/assets/photo_5_2025-08-26_12-02-14.jpg',
      '/assets/photo_6_2025-08-26_12-02-14.jpg',
      '/assets/photo_7_2025-08-26_12-02-14.jpg',
      '/assets/photo_8_2025-08-26_12-02-14.jpg',
      '/assets/photo_9_2025-08-26_12-02-14.jpg',
      '/assets/photo_10_2025-08-26_12-02-14.jpg',
      '/assets/photo_11_2025-08-26_12-02-14.jpg',
      '/assets/photo_12_2025-08-26_12-02-14.jpg',
      '/assets/photo_13_2025-08-26_12-02-14.jpg',
      '/assets/photo_14_2025-08-26_12-02-14.jpg',
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imageTrusted.trustedScreenImages.length - 1 : prevIndex - 1,
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === imageTrusted.trustedScreenImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Handle clicks outside the image
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={scss.trustedScreen}>
      <Marquee speed={50} gradient={false} className={scss.trustedScreenBlocks}>
        {imageTrusted.trustedScreenImages.map((img, index) => (
          <div key={index} className={scss.trustedScreenBlock}>
            <img
              src={img}
              alt={`Gallery image ${index + 1}`}
              className={scss.trustedScreenImages}
              onError={(e) => console.error(`Failed to load image: ${img}`, e)}
              onClick={() => openModal(index)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </Marquee>

      {isModalOpen && (
        <div className={scss.modalOverlay} onClick={handleModalClick}>
          <div className={scss.modalContent}>
            <img
              src={imageTrusted.trustedScreenImages[selectedImageIndex]}
              alt={`Gallery image ${selectedImageIndex + 1}`}
              className={scss.modalImage}
            />
            <button className={scss.modalCloseButton} onClick={closeModal} aria-label='Close modal'>
              ×
            </button>
            <button
              className={scss.modalNavButtonPrev}
              onClick={showPreviousImage}
              aria-label='Previous image'>
              ←
            </button>
            <button
              className={scss.modalNavButtonNext}
              onClick={showNextImage}
              aria-label='Next image'>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
