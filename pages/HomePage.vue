<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">TWITTER</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              v-on:click="moveToCreatePost"
              >Create Post</b-button
            >
          </b-nav-form>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                
                ><nuxt-link to="/ProfilePage">Profile</nuxt-link></b-button
              >
              <b-button size="sm" class="my-2 my-sm-0" v-on:click="moveToLogin"
                >Logout</b-button
              >
            </b-nav-form>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <h2>Post</h2>
    <div>
      <b-collapse visible id="collapse-3">
        <b-card
          v-for="item in Post"
          :key="item.id"
          v-on:click="moveToPostPage(item.id)"
          >{{ item.title }}
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['Post']),
  },
  methods: {
    moveToLogin() {
      this.$router.push('/')
    },

    moveToProfile() {
      this.$router.push('/ProfilePage')
    },

    async moveToPostPage(id) {
      console.log('dispatching ' + id)
      this.$router.push('/post/' + id) 
    },

    moveToCreatePost() {
      this.$router.push('/post')
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  align-items: right;
}
</style>
