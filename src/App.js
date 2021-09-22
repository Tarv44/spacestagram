import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button} from '@shopify/polaris';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import TopBar from './TopBar';
import Footer from './Footer';

const App = () => {
  const [images, setImages] = useState([])
  const imageCards = images.map((imageData, i) => {
    const toggleLike = () => {
      const newLikeImages = images
      newLikeImages[i].liked = !newLikeImages[i].liked
      setImages(newLikeImages)
    }
    return <ImageCard 
      key={i}
      imageData={imageData}
      toggleLike={toggleLike}
    />
  })
  const getImages = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&count=10`)
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`);
    }
    const pics = await response.json()
    const likeablePics = pics.map(p => {
      p.liked = false;
      return p
    })
    setImages(likeablePics)
  }
  const loadMore = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&count=10`)
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`);
    }
    const pics = await response.json()
    const likeablePics = pics.map(p => {
      p.liked = false;
      return p
    })
    const newImages = images.concat(likeablePics)
    setImages(newImages)
  }
  useEffect(() => {
    getImages();
  }, [])
  return (
    <AppProvider i18n={enTranslations}>
      <div className={styles.app}>
        <TopBar />
        <div className={styles.imageCards}>
          {imageCards}
          <div className={styles.buttonContainer}>
            <Button onClick={loadMore}>Load More...</Button>
          </div>
        </div>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App;
