<template>
  <div id="app">
    <div class="container">
      <h1>Working Timers</h1>
      <div class="input">
        <input class="test" v-model="projectName" placeholder="project name">
        <button @click="addProject">ADD</button>
      </div>
      <DisplayProjectTimers v-if="projectList.length" :projectList="projectList"
        @timer-on="timerOn($event)"
        @delete-project="deleteProject($event)"
      />
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
    addProject() {
      // ローカルストレージに案件追加
      if (!this.projectName || !this.projectName.trim().length) {
        alert('案件名が未入力です');
        return;
      }
      const project = {
        name: this.projectName,
        workingTime: 0,
        restTime: 0,
      };

      this.projectList.push(project);
      this.$localStorage.set('myProjects', JSON.stringify(this.projectList));
      this.projectName = '';
    },
    deleteProject(params) {
      // ローカルストレージの案件を削除
      const newProjects = [];
      for (let i = 0; i < this.projectList.length; i += 1) {
        if (params.project.name === this.projectList[i].name) {
          continue;
        }
        newProjects.push(this.projectList[i]);
      }
      this.$localStorage.set('myProjects', JSON.stringify(newProjects));
      this.projectList = newProjects;
    },
    timerOn(params) {
      console.log(params);
    },
    timerStop() {
    },
  },
  created() {
    const myProjects = JSON.parse(this.$localStorage.get('myProjects'));
    if (!myProjects) return;
    for (let i = 0; i < myProjects.length; i += 1) {
      this.projectList.push(myProjects[i]);
    }
  },
};
</script>

<style>
body {
  font-family: Verdana, sans-serif;
}
.container {
  /* background-color: pink; */
  width: 500px;
  margin: auto;
}
.container h1 {
  font-size: 24px;
  padding: 10px 0;
}
.container .input {
  margin-top: 20px;
}
.container h1,
.container .input {
  margin-left: 110px;
}
.container .input button {
  margin-left: 10px;
}
</style>
