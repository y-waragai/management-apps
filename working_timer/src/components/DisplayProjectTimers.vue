<template>
  <ul class="fadeIn">
    <li>
        <strong class="project">案件</strong>
        <strong class="workTime">稼働時間</strong>
    </li>
    <transition-group tag="ul">
      <li v-for="(project, i) in projectList" :key="i">
        <span>{{ project.name }}</span>
        <span class="time">
          {{ project.workingTime }}
          <button v-show="project.isDisplaydStart" @click="start(i)" :disabled="project.isDisabledStart">start</button>
          <button v-show="project.isDisplayStop" @click="stop(i)">stop</button>
          <button v-show="project.isDisplayReset" @click="reset(i)">reset</button>
          <span class="del" @click="deleteProject(project)">[x]</span>
        </span>
      </li>
    </transition-group>
  </ul>
</template>

<script>
export default {
  name: 'DisplayProjectTimers',
  props: {
    projectList: Array,
  },
  methods: {
    start(index) {
      this.$emit('start', index);
    },
    stop(index) {
      this.$emit('stop', index);
    },
    reset(index) {
      this.$emit('reset', index);
    },
    deleteProject(project) {
      this.$emit('delete-project', project);
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
  margin-right: 100px;
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
.v-enter-active {
  transition: all 0.8s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-to,{
  opacity: 1;
}
</style>
