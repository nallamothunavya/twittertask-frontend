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
    </div>
    <button @click="DeletePost">delete tweet</button>
    <button @click="UpdatePost">update</button>
    
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
    DeletePost() {
      console.log('calling delete tweet')
      this.$store.dispatch('deleteTweet')
    },

    UpdatePost(id) {
      this.$store.dispatch('update', id)
    },

    update() {
        this.isUpdating = true;
      },

      async submitTodo() {
        this.isUpdating = false;
        await this.$store.dispatch('update', {
          id: this.item.id,
          title: this.postText,
          
        });
      },
  },
}
</script>

<style lang="scss" scoped></style>
