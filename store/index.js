const state = () => ({
  token: null,
  user_id: null,
  email: null,
  full_name: null, // again spelling mistake. It should be full_name
  is_register: false,
  Post: [],
  current_comments: [],
  Post_title: null,
  Post_id: null,
  post_user_id: null,
  tweet: [],
})

const getters = {}

const mutations = {
  setToken(state, data) {
    state.token = data.token
    // alert(state.token)
    state.user_id = data.id
    // alert('userid' + state.user_id)
    state.email = data.email
    state.full_name = data.full_name
  },

  setName(state, data) {
    state.full_name = data
    alert(' Updated name successfully')
  },

  setPostTitle(state, data) {
    state.Post_title = data.title
    state.Post_id = data.id
    state.post_user_id = data.user_id
  },

  setIsRegister(state, value) {
    state.is_register = value
  },

  setList(state, data) {
    state.Post = data
  },

  createdNewPost(state, data) {
    state.Post.unshift(data)
    this.$router.push('/HomePage')
  },

  setCurrentPost(state, data) {
    state.current_Post = data
  },

  setComments(state, data) {
    console.log('comments' + data)
    state.current_comments = data
    // console.log('aftr set' + state.current_comments)
  },
  setTweet(state, data) {
    state.tweet = data
  },
  updatePost(state, data) {
    state.Post_title = data.title
    const index = state.Post.findIndex((x) => x.id == data.id)
    state.Post[index].title = data.title
  },
}

const actions = {
  async setIsRegister(state, value) {
    this.commit('setIsRegister', value)
  },

  async registerUser(state, data) {
    try {
      console.log('data:' + data)

      const res = await this.$axios.post('user', data)

      if (res.status == 201) {
        console.log(res)

        alert('Registration successful, please login to continue')

        this.commit('setIsRegister', false)
      } else {
        alert('Registration failed, please check details')
      }
    } catch (e) {
      console.log(' error while registering user : ' + e)
      alert(' cannot register right now, please try again later' + e)
    }
  },

  async login(state, data) {
    try {
      //console.log("data:" + data.username);
      // Hit the backend api.
      const res = await this.$axios.post('user/login/', {
        email: data.email,
        password: data.password,
      })
      // console.log(res.data.id)

      this.commit('setToken', res.data)
      if (res.status == 200) {
        console.log(res)

        // Set the token after the call is success.
        this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        // move to the homepage from login page.
        this.$router.push('/HomePage')
      } else {
        alert('Invalid email or password')
      }
    } catch (e) {
      console.log(' error while logging in: ' + e)
      alert(' cannot login right now, please try again later')
    }
  },

  async GetAllPost({ commit, state }) {
    const res = await this.$axios.get('Post')
    console.log(res.data)
    commit('setList', res.data)
  },

  async GetPostById({ commit, state }, id) {
    const res = await this.$axios.get('Post/' + id)
    console.log(res.data)
    commit('setPostTitle', res.data)
  },

  async createPost({ commit, state }, data) {
    const res = await this.$axios.post('Post', data)
    commit('createdNewPost', res.data)
  },

  async addComment({ commit, state }, data) {
    const res = await this.$axios.post('comment', {
      text: data.text,
      post_id: state.Post_id,
    })
    // commit('createdNewPost', res.data)
  },

  async deleteComment({ commit, state }, id) {
    const res = await this.$axios.delete('comment/' + id)
    // commit('createdNewPost', res.data)
  },

  async updatePost({ commit, state }, data) {
    console.log('post id ' + state.Post_id)
    const res = await this.$axios.put(
      'http://localhost:5000/api/post/' + data.id,
      { title: data.title }
    )
    commit('updatePost', data)
  },
  async deletePost({ commit, state }, data) {
    const res = await this.$axios.delete(
      'http://localhost:5000/api/post/' + state.Post_id
    )
  },

  async updateProfile(state, data) {
    try {
      // Hit the backend api.
      // alert(state.token)
      const res = await this.$axios.put('user', data)

      if (res.status == 204) {
        console.log(res)

        // Set the name after the call is success.
      } else {
        alert('Cannot update profile')
      }
    } catch (e) {
      console.log(' error while updating profile : ' + e)
      alert(' Cannot update profile right now, please try again later')
    }
  },

  async GetAllCommentsForPost({ commit, state }, id) {
    const res = await this.$axios.get('comment/' + id)
    console.log(res.data)
    commit('setComments', res.data)
  },

  async createNewPost({ commit, state }, data) {
    const res = await this.$axios.post('Post', data)
    commit('createdNewPost', res.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
