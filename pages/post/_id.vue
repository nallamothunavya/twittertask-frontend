<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="primary" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TWITTER</b-navbar-brand>
      </b-navbar>
            <div>
        <div v-if="isUpdating">
          <p>
            <input type="text" v-model="title" />
          </p>
        </div>
        <h1 v-else>{{ Post_title }}</h1>
        <div class="btns" v-if="post_user_id == user_id">
          <button v-if="!isUpdating" class="btn" @click="updatePost">
            Update
          </button>
          <button
            v-if="!isUpdating"
            class="btn-danger"
            @click="deletePost(tweet.id)"
          >
            Delete
          </button>
          <button class="button" v-else @click="submitPost">Submit</button>
        </div>
      </div>
      <div>
      </div>
    </div> 
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Comment here</label>
      <textarea
        class="form-control"
        v-model="newComment"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="createComment">
      Add Comment
    </button>
    <div>
      <b-collapse visible id="collapse-3">
        <b-card
          class="delete-button"
          v-for="comment in current_comments"
          :key="comment.id"
          ><p>{{ comment.text }}</p>
          <b-button
            v-if="comment.user_id == user_id"
            @click="deleteComment(comment.id)"
            class="btn3"
            pill
            size="sm"
            variant="danger"
            >Delete</b-button
          >
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['current_comments', 'tweet','Post_title','post_user_id','user_id']),
  },
  data() {
    return {
      isUpdating: false,
      newPostText: '',
      title: '',
      newComment:''
    }
  },
  methods: {
   
    async deleteComment(comment_id) {
      await this.$store.dispatch('deleteComment', comment_id)
   await this.$store.dispatch('GetAllCommentsForPost', this.$route.params.id)

    },

    async createComment() {
      console.log(' in here to create a comment')
      await this.$store.dispatch('addComment', {
        text: this.newComment,
        PostId: this.$route.params.id,
      })
   await this.$store.dispatch('GetAllCommentsForPost', this.$route.params.id)

      // calling here. see?
    //   await this.$store.dispatch('GetAllPosts')

    },
   updatePost() {
      this.isUpdating = true
      this.title = this.Post_title
      
    },
    async submitPost() {
      this.isUpdating = false
      await this.$store.dispatch('updatePost', {
        id: this.$route.params.id,
        title: this.title,
      })
     
    },
    async deletePost(id) {
      await this.$store.dispatch('deletePost', id)
      await this.$store.dispatch('GetAllPost')
      this.$router.push('/HomePage')
    },
  },

  async created() {
   await this.$store.dispatch('GetPostById', this.$route.params.id)
   await this.$store.dispatch('GetAllCommentsForPost', this.$route.params.id)
  }
 
}
</script>

<style lang="scss" scoped>
.parent {
  width: 100%;
  display: inline-block;
}

.Post-item {
  text-align: center;
  float: left;
  position: relative;
  width: 150%;
  margin-left: 5%;
  margin-bottom: 5%;
  display: inline-block;
}
.delete-button {
  width: 100%;
  display: inline-block;
}
.btn3 {
  text-align: center;
  float: left;
  position: relative;
  width: 10%;
  left: 80%;
 
}
</style>