import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 1,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://i.imgur.com/pBNT1yy.png",
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
        title: "vue js survey",
        slug: "survey-1",
        status: "draft",
        image: "https://i.imgur.com/BxQe48y.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
        questions: [
            {
                id: 1,
                type: "checkbox",
                question: " where are you from in FRANCE  ?",
                description: "where are you from?",
                data:{
                    options: [
                        {
                            uuid: "uuid1",
                            text: "option 111",
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
                type: "select",
                question: " where are you from in morocco?",
                description: " where are you from?",
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
                id: 3,
                type: "checkbox",
                question: " where are you from in morocco?",
                description: " where are you from?",
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
                id: 3,
                type: "radio",
                question: " where are you from in morocco?",
                description: " where are you from?",
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
                id: 4,
                type: "textarea",
                question: " where are you from in morocco?",
                description: " where are you from?",
                data:{ },
            },
            {
                id: 5,
                type: "radio",
                question: " where are you from in morocco?",
                description: " where are you from?",
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
        image: "https://i.imgur.com/wdYXsgR.png",
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
        id: 4,
        title: "Survey 1",
        slug: "survey-1",
        status: "published",
        image: "https://i.imgur.com/Kp5kTUp.png",
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
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: [ ...tmpSurveys ],
        questionTypes: ["text", "textarea", "checkbox", "radio", "select"],
    },
    getters: {},
    actions: {
        getSurvey({ commit }, id) {
            commit("setCurrentSurvey", { loading: true })
            return axiosClient.get(`/survey/${id}`).then((response) => {
                commit("setCurrentSurvey", response.data);
                commit("setCurrentSurveyLoading", false);
                return response;
            }).catch((error) => {
                commit("setCurrentSurveyLoading", false);
                return error;
            });
        },

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
        saveSurvey({ commit }, survey) {
            delete survey.image_url;

            let response;
            if (survey.id) {
                response = axiosClient
                .put(`/survey/${survey.id}`, survey)
                .then((res) => {
                    commit('updateSurvey', res.data)
                    return res;
                });
            } else {
                    response = axiosClient.post("/survey", survey).then((res) => {
                    commit('saveSurvey', res.data)
                    return res;
                    });
             }
            return response;
            },
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setCurrentSurvey: (state, payload) => {
            state.currentSurvey.data = payload.data ;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = payload.loading ;
        },
        setUser: (state, payload) => {
            state.user.data = payload.user;
            state.user.token = payload.token;
            sessionStorage.setItem("TOKEN", payload.token);
        },
        saveSurvey: (state, payload) => {
            state.surveys.push(payload);
        },
        updateSurvey: (state, payload) => {
            const index = state.surveys.findIndex((survey) => survey.id === payload.id);
            if (index !== -1) {
                state.surveys[index] = payload;
            }
        }
    },
    modules: {},
});

export default store;
