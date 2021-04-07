<template>
<Carousel 
:per-page="1"
:mouse-drag="true"
>
<Slide v-for="(slide,index) in  slides"  :key="index">
    <div class="slider_bck" :style="{ 'background' : `url(${slide.bck})` }" > 
       <div class="gradient">
           <div class="container">
               <div class="content">
                   <app-button linkTo="#"
                   type="link" 
                   :addClass="['hello','there']"
                   :onStyle="{'color' : 'yellow'}"
                   >
                       See Review
                   </app-button>
                   <div class="item">
                       {{ slide.title }}
                   </div>
               </div>
           </div>
       </div>
    </div>
</Slide>
</Carousel>
</template>
<script>
import {Carousel,Slide}  from 'vue-carousel'
import SlideOne from '../../assets/images/featured/1.jpg'
import SlideTwo from '../../assets/images/featured/2.jpg'
import SlideThree from '../../assets/images/featured/3.jpg'
import SlideFour from '../../assets/images/featured/4.jpg'

export default{ 
    data(){ 
        return { 
            slides : [
                {
                     title : 'Red Dead redemption',
                     bck:SlideOne
                },
                {
                     title : 'Watch dogs 2',
                     bck:SlideTwo
                },
                {
                     title : 'rise of tomb rider',
                     bck:SlideThree
                },
                {
                     title : 'Red Dead redemption',
                     bck:SlideFour
                }

            ]
         }
     },
     components : { 
         Slide,
         Carousel,
      }
 }
</script>