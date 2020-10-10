<template>
  <ul class="fadeIn">
    <li>
        <strong class="project">案件</strong>
        <strong class="workTime">稼働時間</strong>
    </li>
    <div class="fadeIn" v-for="(project, i) in projectList" :key="i">
      <li>
        <span>{{ project.name }}</span>
        <span class="time">
          {{ project.workingTime }}
          <button @click="timerOn(project)">start</button>
          <span class="del" @click="deleteProject(project)">[x]</span>
        </span>
      </li>
    </div>
    <!-- <button>休憩</button> -->
  </ul>
</template>

<script>
export default {
  name: 'DisplayProjectTimers',
  props: {
    projectList: Array,
  },
  methods: {
    timerOn(project) {
      this.$emit('timer-on', { project });
    },
    deleteProject(project) {
      this.isDelete = true;
      this.$emit('delete-project', { project });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0px;
}
li {
  width: 100%;
  line-height: 3;
}
strong.workTime {
  float: right;
  margin-right: 110px;
}
span.time {
  float: right;
}
span.time .del {
  font-size: 12px;
  margin-left: 20px;
  cursor: pointer;
  color: rgb(119, 119, 238);
}
span.time button {
  margin-left: 20px;
}
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeOut {
  animation-name: fadeOut;
  animation-duration: 1s;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
