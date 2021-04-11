/* eslint-disable */
import Vue from 'vue'

const posts = {

    namespced: true,
    state: {
        homePost: null,
        post: null
    },
    getters: {
        getAllPost(state) {
            return state.homePost
        },
        getPostData(state) {
            return state.post
        }

    },
    mutations: {
        getPost(state, posts) {
            state.homePost = posts
        },
        getPostById(state, post) {
            state.post = post
        }
    },
    actions: {
        getById({ commit }, payload) {
            Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
                .then(response => response.json())
                .then(postData => {
                    let post = {}
                    for (let key in postData) {
                        post = {
                            ...postData[key]
                        }
                    }
                    commit("getPostById", post)
                })
        },
        getAllPost({ commit }, payload) {
            Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
                .then(response => response.json())
                .then(response => {
                    const posts = []
                    for (let key in response) {
                        posts.push({
                            ...response[key],
                            id: key

                        })
                        commit("getPost", posts.reverse())
                    }
                })
        }
    }
}

export default posts;