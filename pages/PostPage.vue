<template>
<div>
    <div>
   <b-navbar toggleable="sm" type="primary" variant="light">
       <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

       <b-navbar-brand>TWITTER</b-navbar-brand>
       </b-navbar>

    </div>
    <div>
      <b-collapse visible id="collapse-3">
        <b-card
          v-for="comment in current_comments"
          :key="comment.id"
          
          >{{ comment.text }}
        </b-card>
      </b-collapse>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['current_comments']),
  },
        
    }
</script>

<style lang="scss" scoped>

</style>