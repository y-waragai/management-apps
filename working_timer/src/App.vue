<template>
  <div id="app">
    <div class="container">
      <h1>Working Timers</h1>
      <div class="input">
        <input class="test" v-model="projectName" placeholder="project name">
        <button @click="addProject">ADD</button>
      </div>
      <DisplayProjectTimers v-if="projectList.length" :projectList="projectList"
        @start="start($event)"
        @stop="stop($event)"
        @reset="reset($event)"
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
        isDisabledStart: false,
        isDisplaydStart: true,
        isDisplayStop: false,
        isDisplayReset: false,
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
    start(i) {
      this.projectList[i].isDisplaydStart = false;
      this.projectList[i].isDisplayStop = true;
      this.allDisabledStart(true);

      let startTime = Date.now();
      startTime -= this.projectList[i].workingTime;
      this.countUp(startTime, this.projectList[i]);
    },
    stop(i) {
      clearTimeout(this.timeoutId);
      this.projectList[i].isDisplayStop = false;
      this.projectList[i].isDisplayReset = true;
      this.allDisabledStart(false);
    },
    reset(i) {
      this.projectList[i].workingTime = 0;
      this.projectList[i].isDisplayReset = false;
      this.projectList[i].isDisplaydStart = true;
    },
    countUp(startTime, obj) {
      const totalTime = Date.now() - startTime;
      this.timeoutId = setTimeout(() => {
        obj.workingTime = totalTime;
        this.countUp(startTime, obj);
      }, 10);
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
  margin-left: 110px;
}
.container .input button {
  margin-left: 10px;
}
</style>
