<template>
  <div id="app">
    <div class="container">
      <div class="input">
        <input class="test" v-model="projectName" placeholder="project name">
        <button @click="add">ADD</button>
      </div>
      <DisplayProjectTimers :projectList="projectList"/>
    </div>
  </div>
</template>

<script>
import DisplayProjectTimers from '@/components/DisplayProjectTimers.vue';

export default {
  name: 'App',
  data() {
    return {
      projectName: '',
      projectList: [],
    };
  },
  components: {
    DisplayProjectTimers,
  },
  methods: {
    add() {
      // ローカルストレージに案件追加
      const project = {
        name: this.projectName,
        workingTime: 0,
        restTime: 0,
      };

      this.projectList.push(project);
      this.$localStorage.set('myProjects', JSON.stringify(this.projectList));
      this.projectName = '';
    },
    delete() {
      // ローカルストレージの案件を削除
    },
    timerOn() {

    },
    timerStop() {
    },
  },
  created() {
    const myProjects = JSON.parse(this.$localStorage.get('myProjects'));
    console.log(myProjects);
    for (let i = 0; i < myProjects.length; i += 1) {
      this.projectList.push(myProjects[i]);
    }
  },
};
</script>

<style>
.container {
  background-color: pink;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.container .input {
  text-align: center;
}
</style>
