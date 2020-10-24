<template>
  <div id="app">
    <div class="container">
      <h1>Working Timers</h1>
      <div class="input">
        <input class="test" v-model="projectName" placeholder="project name">
        <button @click="addProject">ADD</button>
      </div>
      <DisplayProjectTimers v-if="projectList.length" :projectList="projectList" :rest="rest"
        @on-start="onStart($event)"
        @on-rest="onRest($event)"
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
      timeoutId: null,
      rest: {
        time: 0,
        state: false,
      },
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
        isDisabledStart: false,
      };
      this.projectList.push(project);
      this.$localStorage.set('myProjects', JSON.stringify(this.projectList));
      this.projectName = '';
    },
    deleteProject(project) {
      // ローカルストレージの案件を削除
      const newProjects = [];
      for (let i = 0; i < this.projectList.length; i += 1) {
        if (project.name === this.projectList[i].name) {
          continue;
        }
        newProjects.push(this.projectList[i]);
      }
      this.$localStorage.set('myProjects', JSON.stringify(newProjects));
      this.projectList = newProjects;
    },
    onStart(i) {
      clearTimeout(this.timeoutId);
      let startTime = Date.now();
      startTime -= this.projectList[i].workingTime;
      this.countUp(startTime, i);
    },
    countUp(startTime, i) {
      const totalTime = Date.now() - startTime;
      this.timeoutId = setTimeout(() => {
        if (i === -1) {
          this.rest.time = totalTime;
        } else {
          this.projectList[i].workingTime = totalTime;
        }
        this.countUp(startTime, i);
      }, 10);
    },
    onRest() {
      clearTimeout(this.timeoutId);
      // 休憩終了時
      if (this.rest.state) {
        this.allDisabledStart(false);
        this.rest.state = false;
        return;
      }
      this.allDisabledStart(true);
      this.rest.state = true;
      let startTime = Date.now();
      startTime -= this.rest.time;
      this.countUp(startTime, -1);
    },
    allDisabledStart(flg) {
      // 全てのstartボタンを活性、非活性に設定
      for (let i = 0; i < this.projectList.length; i += 1) {
        this.projectList[i].isDisabledStart = flg;
      }
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
  width: 600px;
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
  margin-left: 140px;
}
.container .input button {
  margin-left: 10px;
}
</style>
