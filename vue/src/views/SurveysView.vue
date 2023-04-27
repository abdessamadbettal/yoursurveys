

<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "New Survey" }}
        </h1>
      </div>
    </template>
    <pre>
        {{ model }}
    </pre>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- title status description image expires_at questions -->

          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              <input
                type="file"
                @change="onImageChoose"
                class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
              />
                Change
              </button>
            </div>

          </div>

          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                placeholder="Survey Title"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                name="description"
                rows="3"
                v-model="model.description"
                autocomplete="survey_description"
                placeholder="You can use markdown here."
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
          </div>

          <div>
            <label
              for="expires_at"
              class="block text-sm font-medium text-gray-700"
            >
              Expires At
            </label>
            <div class="mt-1">
              <input
                type="date"
                name="expires_at"
                id="expires_at"
                v-model="model.expires_at"
                autocomplete="survey_expires_at"
                placeholder="YYYY-MM-DD HH:MM:SS"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="flex items-start">
            <!-- <label for="status" class="block text-sm font-medium text-gray-700">
              Status
            </label> -->
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                name="status"
                id="status"
                v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>

        </div>

        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3 class="text-2xl font-semibold flex items-center justify-between">
                Questions
                <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Question
            </button>
            </h3>
            <div v-if="!model.questions.length" class="text-center text-gray-600">
                You don't have any questions created
            </div>
            <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>

        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>


 <script setup>
import PageComponent from "../components/PageComponent.vue";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import store from "../store";
import { useRoute , useRouter } from "vue-router";

import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();
const router = useRouter();

let model = ref({
  title: "",
  slug: "",
  status: false,
  description: null ,
  image: null,
  image_url: null,
  expires_at: "",
  questions: [],
});
if (route.params.id) {
  model.value = store.state.surveys.find(
    (survey) => survey.id == route.params.id
  );
}

function onImageChoose(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;
    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}
function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}
function questionChange(question) {
  // Important to explicitelly assign question.data.options, because otherwise it is a Proxy object
  // and it is lost in JSON.stringify()
  if (question.data.options) {
    question.data.options = [...question.data.options];
  }
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {

//   if (route.params.id) {
//     store.dispatch("updateSurvey", model.value);
//   } else {
    store.dispatch("saveSurvey", model.value).then(({data}) => {
        console.log('data :>> ', data);
      router.push({
        name: "SurveyView",
        params: { id: data.data.id },
      });
    });
//   }
//   router.push({ name: "surveys" });
}

</script>

 <style scoped>
</style>
