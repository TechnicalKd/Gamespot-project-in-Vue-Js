<template>
<div>
  <compFeature/>
  <compContent/>
</div>

</template>

<script>
import compFeature from '../home/featured'
import compContent from '../home/content'
export default {
    components : { 
        compFeature,
        compContent
     }
}
</script>
