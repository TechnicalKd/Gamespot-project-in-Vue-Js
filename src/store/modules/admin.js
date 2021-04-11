/* eslint-disable */
import Vue from 'vue'
import Router from '../../routes'

const FbAuth = "https://identitytoolkit.googleapis.com/v1/"
const FbKey = "AIzaSyDZIW3kbpA4eSOHD-sKtHSeTVPPd8VqoVg"
const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        authFailed: false,
        refrshLoading: true,
        addpost: false,
        image_Upload: null,
        getPost: null
    },
    getters: {
        getAdminData(state) {
            return state.getPost
        },
        isAuth(state) {
            if (state.token) { return true }
            return false
        },
        refrshLoading(state) {
            return state.refrshLoading
        },

        imageUpload(state) {
            return state.image_Upload
        },

    },
    mutations: {
        refrshLoading(state) {
            state.refrshLoading = false
        },
        addPost(state) {
            state.addpost = true
        },
        getRandomPost(state, posts) {
            state.getPost = posts
        },
        authUser(state, authData) {
            state.token = authData.idToken
            state.refresh = authData.refreshToken

            if (authData.type === 'signin') {
                Router.push('/dashboard')
            } else {

            }

        },
        authFailed(state, type) {
            if (type === 'reset') {
                state.authFailed = false
            } else {
                state.authFailed = true
            }
        },
        logoutUser(state) {
            state.token = null;
            state.refresh = null;
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            Router.push('/')
        },
        imageUpload(state, ImageData) {
            state.image_Upload = ImageData.secure_url
        },
        clearImageUpload(state) {
            state.image_Upload = null
        }

    },
    actions: {
        deletePost({ commit, state }, payload) {
            Vue.http.delete(`posts/${payload}.json?auth=${state.token}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
        },
        addPost({ commit, state }, payload) {
            Vue.http.post(`posts.json?auth=${state.token}`, payload)
                .then(response => response.json())
                .then(authData => {
                    commit("addPost")
                })
        },
        getAdminPosts({ commit }) {
            Vue.http.get('posts.json')
                .then(response => response.json())
                .then(response => {

                    const posts = [];
                    for (let key in response) {
                        posts.push({
                            ...response[key],
                            id: key
                        })
                    }
                    commit('getRandomPost', posts.reverse())
                })

        },
        imageUpload({ commit }, file) {
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/kdtech-software-solution/image/upload';
            const CLOUDINARY_PRESET = 'pvunsice'

            let formData = new FormData();

            formData.append('file', file)
            formData.append('upload_preset', CLOUDINARY_PRESET)

            Vue.http.post(CLOUDINARY_URL, formData, {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => response.json())
                .then(response => {
                    commit("imageUpload", response)
                    console.log(response)
                })

        },

        refreshToken({ commit }) {
            const refresh = localStorage.getItem("refresh")
            if (refresh) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbKey}`, {
                        grant_type: 'refresh_token',
                        refresh_token: refresh

                    })
                    .then(response => response.json())
                    .then(authData => {
                        commit("authUser", {
                            idToken: authData.id_token,
                            refreshToken: authData.refresh_token,
                            type: 'refresh'
                        })
                        commit('refrshLoading')
                        localStorage.setItem("token", authData.id_token)
                        localStorage.setItem("refresh", authData.refresh_token)
                    })
            } else {
                commit('refrshLoading')
            }
        },
        signin({ commit }, payload) {
            Vue.http.post(`${FbAuth}accounts:signInWithPassword?key=${FbKey}`, {
                    ...payload,
                    returnSecureToken: true
                })
                .then(response => response.json())
                .then(authData => {
                    commit("authUser", {
                        ...authData,
                        type: 'signin'
                    })
                    localStorage.setItem("token", authData.idToken)
                    localStorage.setItem("refresh", authData.refreshToken)
                    console.log(authData)
                })
                .catch(error => {
                    commit("authFailed")
                })
        }
    }
}
export default admin;