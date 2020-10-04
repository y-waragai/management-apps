<template>
  <div id="app">
    <input v-model="projectName" placeholder="please input project name">
    <button @click="add">ADD</button>
    <DisplayProjectTimers :projectList="projectList"/>
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
        startTime: 0,
        restTime: 0,
        endTime: 0,
      };

      this.projectList.push(project);
      this.$localStorage.set('myProjects', JSON.stringify(this.projectList));
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
</style>
