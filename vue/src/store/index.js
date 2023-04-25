import { createStore } from "vuex";

const store = createStore({
    state: {
        user: {
            data: {
                name: "Tom Cook",
                email: "tom@example.com",
                imageUrl:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            token: sessionStorage.getItem("TOKEN"),
        },
    },
    getters: {},
    actions: {
        register({ commit }, payload) {
            return fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log('res :>> ', res);
                    commit("setUser", res);
                    return res;
                }
            );
        }
    },
    mutations: {
        logout: (state) => {
            (state.user.data = {}), (state.user.token = null);
        },
        setUser: (state, payload) => {
            state.user.data = payload.user;
            state.user.token = payload.token;
            sessionStorage.setItem("TOKEN", payload.token);
        }
    },
    modules: {},
});

export default store;
