import React, { useState } from 'react';
import { Card, Stack, Button, Collapsible, TextContainer } from '@shopify/polaris';
import styles from './ImageCard.module.css';

const ImageCard = ({imageData, toggleLike}) => {
  const [open, setOpen] = useState(false)
  const [allowUnlike, setAllowUnlike] = useState(false)
  const [liked, setLiked] = useState(imageData.liked)
  const {
    title,
    date,
    explanation,
    url,
    hdurl
  } = imageData
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const cardTitle = `${title} - ${new Date(date).toLocaleDateString("en-US", dateOptions)}`
  const handleLike = () => {
    if (!allowUnlike) setAllowUnlike(true)
    setLiked(!liked)
    toggleLike();
  }
  return (
    <Card 
      title={cardTitle}
      sectioned
    >
      <div onClick={handleLike} className={styles.imgContainer}>
        <img 
          src={url} 
          srcSet={`${url}, ${hdurl} 2x`} 
          alt={title}
          width='100%'
          height='100%' 
        />
        <div style={{display: liked ? 'block' : 'none'}} className={styles.heart}></div>
        <div style={{display: allowUnlike && !liked ? 'block' : 'none'}} className={styles.brokenHeart}></div>
      </div>
      <Stack vertical>
        <div className={styles.buttonGroup}>
          <Button
            onClick={() => setOpen(!open)}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
          >
            Explanation
          </Button>
          <Button
            onClick={handleLike}
            primary={!liked}
            destructive={liked}
          >
            {liked ? 'Unlike' : 'Like'}
          </Button>
        </div>
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
          expandOnPrint
        >
          <TextContainer>
            <p>{explanation}</p>
          </TextContainer>
        </Collapsible>
      </Stack>
    </Card>
  );
};
export default ImageCard;