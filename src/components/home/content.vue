<template>
  <div class="container">
        <div class="home_container">
           <md-card  v-for="(post,index) in posts " :key="index">
               <md-card-media
                md-ratio="16:9"
               >
                <img :src="`${post.img}`">
               </md-card-media>
               <md-card-header>
                   <h2 class="title">{{ post.title }}</h2>
                   <div class="md-subheaded">
                       <div>{{ post.description }}</div>
                   </div>
               </md-card-header>
               <md-card-actions>
                   <app-button
                   type="link"
                   linkTo="#"
                   :addClass="['small_link']"
                   >    
                    See Review
                   </app-button>
               </md-card-actions>
            </md-card>
        </div>
  </div>
</template>



<script>
export default  { 
    computed : {
        posts(){ 
            return this.$store.getters['getAllPost']
         }
    },
    created(){ 
        this.$store.dispatch("getAllPost",{ 
            limit: 3
         })
     }
 }
</script>