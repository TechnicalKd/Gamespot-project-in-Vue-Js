<template>
<div>

    <router-link
    v-if="type=='link'"
   :to="linkTo"
   :class="['button_default',...addClass]"
   :style="onStyle"
    >

    <slot/>
    </router-link>
    <div v-if="type=='btn'">
        <slot/>
    </div>


</div>
</template>

<script>
export default { 
    props : ['linkTo','addClass','onStyle','type']
 }
</script>