const state = () => ({
  token: null,
  user_id: null,
  email: null,
  name: null,
  is_register: false,
  Post: [],
  current_comments: [],
})

const getters = {}

const mutations = {
  setToken(state, data) {
      state.token = data.token
      state.user_id = data.user_id
      state.email = data.email
      state.full_name = data.full_name
  },

  setName(state, data) {
      state.name = data;
      alert(" Updated name successfully")
  },

  setIsRegister(state, value) {
      state.is_register = value;
  },

  setList(state, data) {
      state.Post = data
  },

  createdNewPost(state, data) {
      state.Post.unshift(data)
      this.$router.push('/HomePage')
  },

  setComments(state, data) {
      console.log("comments" + data)
      state.current_comments = data
      console.log("aftr set" + state.current_comments)
  }

  
}

const actions = {

  async setIsRegister(state, value) {
      this.commit('setIsRegister', value)
  },

  async registerUser(state, data) {
      try {
          console.log("data:" + data);
          
          const res = await this.$axios.post('user', {
              full_name: data.Fullname,
              email: data.email,
              password: data.password,
          })

          if (res.status == 201) {
              console.log(res)

              alert("Registration successful, please login to continue");

              this.commit('setIsRegister', false);

          } else {
              alert('Registration failed, please check details')
          }
      } catch (e) {
          console.log(' error while registering user : ' + e)
          alert(' cannot register right now, please try again later')
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

          if (res.status == 200) {
              console.log(res)

              // Set the token after the call is success.
              this.commit('setToken', res.data)
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

  async createPost({ commit, state }, data) {
      const res = await this.$axios.post('post', data)
      commit('createdNewPost', res.data)
  },

  async updateProfile(state, data) {
      try {
          // Hit the backend api.
          const res = await this.$axios.put('user/update/', data)

          if (res.status == 204) {
              console.log(res)

              // Set the name after the call is success.
              this.commit('setName', data.name)


          } else {
              alert('Cannot update profile')
          }
      } catch (e) {
          console.log(' error while updating profile : ' + e)
          alert(' Cannot update profile right now, please try again later')
      }
  },

  async GetAllCommentsForPost({ commit, state }) {
     

      const res = await this.$axios.get('comment/16')
      console.log(res.data)
      commit('setComments', res.data)

  },

  
}

export default {
  state,
  getters,
  mutations,
  actions,
}
