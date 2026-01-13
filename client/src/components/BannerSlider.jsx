// import { banners } from '../assets/constants'
// import React from 'react'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

// const BannerSlider = () => {
//   const settings = { 
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     speed: 800,
//     arrows: true,
//     dots: true,
//     centerMode: true,
//     centerPadding: "220px",
//     pauseOnHover: true,
//   }

//   return (
//     <div className="w-full bg-black mt-[80px] overflow-hidden">
//       <Slider {...settings}> 
//         {banners.map((banner, i) => (
//           <div key={i} className="px-2 outline-none">
//             <img 
//               src={banner} 
//               alt={`banner-${i}`}
//               className="rounded-xl w-full h-[280px] object-cover"
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   )
// }

// export default BannerSlider


import { banners } from '../assets/constants'
import React from 'react'
import Slider from 'react-slick'

const BannerSlider = () => {
  const settings = { 
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    arrows: true,
    dots: true,
    centerMode: true,
    centerPadding: "220px",
    pauseOnHover: true,
  }

//   return (
//     <div className="w-full bg-black relative overflow-visible">
//       <Slider {...settings}> 
//         {banners.map((banner, i) => (
//           <div key={i} className="px-2 outline-none">
//             <img 
//               src={banner} 
//               alt={`banner-${i}`}
//               className="rounded-xl w-full h-280px object-cover"
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   )
// }

// export default BannerSlider

  return (
    <div className="w-full bg-black  overflow-visible">
      <Slider {...settings}>
        {banners.map((banner, i) => (
          <div key={i} className="px-2">
            <img
              src={banner}
              alt={`banner-${i}`}
              className="w-full h-300px rounded-xl object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default BannerSlider
