/* eslint-disable */
import Vue from 'vue'

const posts = {

    namespced: true,
    state: {
        homePost: null
    },
    getters: {
        getAllPost(state) {
            return state.homePost
        }
    },
    mutations: {
        getPost(state, posts) {
            state.homePost = posts
        }
    },
    actions: {
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