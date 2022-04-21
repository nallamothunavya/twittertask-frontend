<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="primary" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TWITTER</b-navbar-brand>
      </b-navbar>
    </div>
    <div>
      <h1>{{ tweet_title }}</h1>
    
    <input v-model="newTweetText" v-if="isUpdating" type="text" />
      <p v-else>{{ current_tweet.title }}</p>
      <div class="parent">
        <div class="tweet-item">
          <div
            class="btns"
            v-if="current_tweet.user_id == $store.state.user_id"
          >
            <b-button
              v-if="!isUpdating"
              pill
              size="sm"
              v-on:click="updateTweet"
              variant="warning"
              >Update</b-button
            >
            <b-button
              @click="deleteTweet"
              v-if="!isUpdating"
              class="btn"
              pill
              size="sm"
              variant="danger"
              >Delete</b-button
            >
            <b-button
              v-else
              pill
              size="sm"
              @click="submitTweet"
              variant="success"
              >Submit</b-button
            >
          </div>
        </div>
      </div>
    </div>
    
    <div>
    </div>
      <b-collapse visible id="collapse-3">
        <h3>Comments</h3>
        <b-card v-for="comment in current_comments" :key="comment.id"
          >{{ comment.text }}
          <button @click="DeleteComment(comment.id)">delete</button>
        </b-card>
      </b-collapse>
      <input type="text" v-model="text" /><button @click="AddComment">
        Add Comment
      </button>
    </div>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      text: '',
      isUpdating: false,
    }
  },
  computed: {
    ...mapState(['current_comments', 'tweet_title']),
  },
  methods: {
    AddComment() {
      this.$store.dispatch('addComment', this.text)
    },
    DeleteComment(id) {
      this.$store.dispatch('deleteComment', id)
    },
    updateTweet() {
      this.isUpdating = true
      this.newTweetText = this.current_tweet.title
    },

    async submitTweet() {
      this.isUpdating = false
      let res = await this.$store.dispatch('updateTweet', {
        tweet_id: this.current_tweet.tweet_id,
        title: this.newTweetText,
      })

      if (res == true) {
        // this.current_tweet.title = this.newTweetText
      }
    },
  },
  mounted() {

    this.$store.dispatch('loadTweet', this.$route.params.id)
  },


   
  
}
</script>

<style lang="scss" scoped></style>
