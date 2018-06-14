<template>
  <div class="home">
    <GoodReads msg=";Goodreads Search Center;"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodReads from '@/components/GoodReads.vue'

export default {
  name: 'goodreads',
  components: {
    GoodReads
  }
}
</script>
