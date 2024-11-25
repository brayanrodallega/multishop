/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'



export default function Banner({ desktopImages, mobileImages} ) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  
  const images = isMobile ? mobileImages: desktopImages
  console.log(images);
  
  if(!desktopImages.length)return null
 
  return (
    <Carousel className="responsive-banner">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.src}
            alt={`Slide ${index + 1}`}
          />
          <Carousel.Caption>
            <h3>{image.title || ''}</h3>
            <p>{image.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}