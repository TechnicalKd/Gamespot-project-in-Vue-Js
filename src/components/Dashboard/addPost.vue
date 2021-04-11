/* eslint-disable */    
<template>
<div class="dashboard_form">
<h1>Add Post</h1>
<form @submit.prevent="addPost">
    <div v-id="imageUpload">
            <img :src="imageUpload" >
    </div>
    <div  class="input_field"
    :class="{invalid: $v.formData.title.$error}"
    >
    <label>Title</label>
    <input type="text"
     v-model="formData.title"
    @blur="$v.formData.title.$touch()"    
     >
     <p class="error_label" v-if="$v.formData.title.$error">
         this inout is required
     </p>
    </div>

    <!-- Image Section Start -->
 <div  class="input_field"
    :class="{invalid: $v.formData.title.$error}"
    >
    <label>Image</label>
    <input type="file"
   @change="processFile($event)"
     >
     <p class="error_label" v-if="$v.formData.title.$error">
         this inout is required
     </p>
    </div>
    <!-- End of the image -->











     <div  class="input_field"
    :class="{invalid: $v.formData.desc.$error}"
    >
    <label>Description</label>
    <input type="text"
     v-model="formData.desc"
    @blur="$v.formData.desc.$touch()"    
     >
     <p class="error_label" v-if="$v.formData.desc.$error">
         this inout is required
     </p>
          <p class="error_label" v-if="!$v.formData.desc.maxLength">
    Must Not Greater Than {{ 
        $v.formData.desc.$params.maxLength.max

     }} chracter
     </p>
    </div>
   <div class="input_field">
       <label>Content</label>
        <wysiwyg v-model="formData.content" />
    </div>
    <div class="input_field">
        <label>Rating</label>
        <select
        @blur="$v.formData.rating.$touch()"
         v-model="formData.rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    <p class="error_label" v-if="$v.formData.rating.$error">
        Please select input 
    </p>
    </div>
<button type="submit">Add Post</button>

</form>
<md-dialog
:md-active="dialogue"
>
<p >
    Your post has no content,are you suru you want to post this ? 
</p>
<md-dialog-actions>
    <md-button class="md-primary" @click="dialogOnCancel">Oop,I want to add it.</md-button>
     <md-button class="md-primary"  @click="dialogOnConfirm">Yes, I amd sure.</md-button>
</md-dialog-actions>
 </md-dialog>
 <div v-if="addpost" class="post_successfull">
     Your Post was posted
 </div>
</div>
</template>  

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
export default { 
    data() { 
        return {
            dialogue:false,
 formData : {
                 img: '',
                title : '',
                desc: '',
                content : '',
                rating: ''
             }
         }
    },
    validations : {
        formData : { 
            title: {
                required,
             },
              desc: {
                   required,
                   maxLength: maxLength(105)
             },
             rating : { 
                 required
             }

        }
     },
     computed: { 
            addpost(){ 
                let status = this.$store.getters['admin/addPostStatus'];
              if(status){
                  this.clearpost()
                  return this.$store.commit('admin/clearImageUpload')
               }
               return status
            },
            // imageUpload(){
            //     let  imageUrl = this.$store.getters['admin/imageUpload']
            //     this.formData.img = imageUrl
            //     return imageUrl 
            //  }
      },
     methods :{
         processFile(event){ 
             let  file = event.target.files[0]
             this.$store.dispatch("admin/imageUpload",file)
         },
         addPost(){
            if(!this.$v.$invalid){ 
                if(this.formData.content === ''){ 
                    this.dialogue = true
                }else{ 
                    this.submitForm()
                 }
            }else { 
                   alert('Something Went Wrong') 
             }
         },
         dialogOnCancel(){
             this.dialogue=false
         },
         dialogOnConfirm(){ 
             this.dialogue=false
              this.submitForm()
          },
         submitForm(){
             this.$store.dispatch('admin/addPost',this.formData)
         }  
      },
      
 }
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.input_field .invalid input,
.input_field .invalid select { 
    border:1px solid red;
 }
 
</style>