import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button} from '@shopify/polaris';
import './App.css';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';

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
  useEffect(() => {
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
      console.log(likeablePics)
      setImages(likeablePics)
    }
    getImages();
  }, [])
  return (
    <AppProvider i18n={enTranslations}>
      <div>
        {imageCards}
        <Button>Load More...</Button>
      </div>
    </AppProvider>
  )
}

export default App;
