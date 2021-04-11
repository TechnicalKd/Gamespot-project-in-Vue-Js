<template>
<div class="container">
    <div class="signin_container">
            <h1>Sign In</h1>
            <form @submit.prevent="onSubmit">
                <div class="input_field"
                :class="{ invalid: $v.formData.email.$error}"
                >
                    <label>Email</label>
                    <input type="email"
                       @blur="$v.formData.email.$touch()" 
                     v-model="formData.email">
                     <div v-if="$v.formData.email.$error">
                         <div class="error_label" v-if="!$v.formData.email.required">
                             this field is required
                         </div>
                         <div class="error_label" v-if="!$v.formData.email.email">
                             Please Provide the Valid Email
                         </div>
                     </div>
                    
                </div>

                 <div class="input_field"
                 >
                    <label>Password</label>
                    <input type="password" v-model="formData.password">
                </div>
                <button type="submit">Sign In</button>
     <p class="error_label" v-if="error"> 
                    Something Went Wrong
            </p>

            <p class="error_label" v-if="authFailed"> 
                   Kindly Check your Email
            </p>
            
            </form>
           
    </div>
</div>
</template>

<script>
import {   required,email  } from 'vuelidate/lib/validators'
export default { 
    data() {  
        return { 
            error :'',
            formData :{
                email: '',
                password : '' 
             }
        }
    },
    computed:  { 
        authFailed(){
            return this.$store.state.admin.authFailed
        }
     },
     destroyed(){  
         this.$store.state.dispatch("admin/authFailed",'reset')
     },
    validations : { 
        formData : { 
               email : { 
                   required,
                   email
                } ,
                password : {
                    required
                 }
        }
     },
    methods : { 
        onSubmit(){
            if(!this.$v.$invalid){
            this.$store.dispatch('admin/signin',this.formData)
             }else{ 
                 this.error = true
                 setTimeout(()=>{ 
                     this.error = false
                 },3000)
              }
        }
     }
 }
</script>

<style scoped>
.input_field .invalid input { 
    border:1px solid red;
 }


</style>