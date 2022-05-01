import { Box, Typography } from "@mui/material"
import Slider from "react-slick"


const HomePage = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>

      <Box display='flex' justifyContent='center' sx={{p: 4}}>
        <Typography variant='h2'>
          Welcome to our store
        </Typography>
      </Box>

      <Slider {...settings}>
       <div>
         <img src="/images/hero4.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
       </div>

       <div>
         <img src="/images/hero5.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
       </div>

       <div>
         <img src="/images/hero6.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
       </div>
      </Slider>

    

    </>
  )
}

export default HomePage