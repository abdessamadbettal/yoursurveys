import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 1,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://source.unsplash.com/random/400x300",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
        questions: [
            {
                id: 1,
                type: "text",
                description: " description 1",
                data:{
                    options: [
                        {
                            uuid: "uuid1",
                            text: "option 1",
                        },
                        {
                            uuid: "uuid2",
                            text: "option 2",
                        },
                        {
                            uuid: "uuid3",
                            text: "option 3",
                        },

                    ]
                },
            },
        ],
        created_at: "2021-01-01 00:00:00",
        updated_at: "2021-01-01 00:00:00",
        expire_date: "2021-01-01 00:00:00",
    },
    {
        id: 2,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://source.unsplash.com/random/400x300",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
        questions: [
            {
                id: 1,
                type: "text",
                description: " description 1",
                data:{
                    options: [
                        {
                            uuid: "uuid1",
                            text: "option 1",
                        },
                        {
                            uuid: "uuid2",
                            text: "option 2",
                        },
                        {
                            uuid: "uuid3",
                            text: "option 3",
                        },

                    ]
                },
            },
        ],
        created_at: "2021-01-01 00:00:00",
        updated_at: "2021-01-01 00:00:00",
        expire_date: "2021-01-01 00:00:00",
    },
    {
        id: 3,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://source.unsplash.com/random/400x300",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
        questions: [
            {
                id: 1,
                type: "text",
                description: " description 1",
                data:{
                    options: [
                        {
                            uuid: "uuid1",
                            text: "option 1",
                        },
                        {
                            uuid: "uuid2",
                            text: "option 2",
                        },
                        {
                            uuid: "uuid3",
                            text: "option 3",
                        },

                    ]
                },
            },
            {
                id: 2,
                type: "text",
                description: " description 1",
                data:{
                    options: [
                        {
                            uuid: "uuid1",
                            text: "option 1",
                        },
                        {
                            uuid: "uuid2",
                            text: "option 2",
                        },
                        {
                            uuid: "uuid3",
                            text: "option 3",
                        },

                    ]
                },
            },
            {
                id: 2,
                type: "text",
                description: " description 1",
                data:{},
            },
        ],
        created_at: "2021-01-01 00:00:00",
        updated_at: "2021-01-01 00:00:00",
        expire_date: "2021-01-01 00:00:00",
    },
    {
        id: 3,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://source.unsplash.com/random/400x300",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
        questions: [],
        created_at: "2021-01-01 00:00:00",
        updated_at: "2021-01-01 00:00:00",
        expire_date: "2021-01-01 00:00:00",
    },
];





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
        surveys: [...tmpSurveys],
    },
    getters: {},
    actions: {
        register({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axiosClient.post("/register", payload).then((response) => {
                    commit("setUser", response.data);
                    resolve(response);
                });
            });
        },
        login({ commit }, payload) {
            return axiosClient.post("/login", payload).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post("/logout").then(response => {
                commit("logout");
                return response;
            });
        },
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, payload) => {
            state.user.data = payload.user;
            state.user.token = payload.token;
            sessionStorage.setItem("TOKEN", payload.token);
        },
    },
    modules: {},
});

export default store;
