import React from 'react'
// import { Carousel } from "@material-tailwind/react";
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
function HeroSection() {
  return (
    <CCarousel controls indicators dark style={{ height: '50vh' }}>
      <CCarouselItem>
        <CImage className="d-block w-100" src="../../images/1.jpg" alt="slide 1" style={{ height: '50vh', objectFit: 'cover' }} />
        <CCarouselCaption className="d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="../../images/2.jpg" alt="slide 2" style={{ height: '50vh', objectFit: 'cover' }} />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="../../images/3.jpg" alt="slide 3" style={{ height: '50vh', objectFit: 'cover' }} />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
    
  )
}

export default HeroSection
