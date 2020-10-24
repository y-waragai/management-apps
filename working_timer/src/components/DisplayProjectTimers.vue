<template>
  <ul class="fadeIn">
    <li>
        <strong class="header1">案件</strong>
        <strong class="header2">稼働時間</strong>
    </li>
    <transition-group tag="ul">
      <li v-for="(project, i) in projectList" :key="i">
        <span>{{ project.name }}</span>
        <span class="time">
          {{ $moment(project.workingTime).utc().format('HH:mm:ss') }}
          <button @click="onStart(i)" :disabled="project.isDisabledStart">start</button>
          <span class="del" @click="deleteProject(project)">[x]</span>
        </span>
      </li>
    </transition-group>
    <div class="rest">
      <span>{{ $moment(rest.time).utc().format('HH:mm:ss') }}</span>
      <button @click="onRest()">{{ !rest.state ? '休憩開始' : '休憩終了' }}</button>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'DisplayProjectTimers',
  props: {
    rest: Object,
    projectList: Array,
  },
  methods: {
    onStart(index) {
      this.$emit('on-start', index);
    },
    onRest() {
      this.$emit('on-rest');
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
.header2, .time, .rest {
  float: right;
}
.header2 {
  margin-right: 110px;
}
.time button {
  margin-left: 20px;
  text-align: center;
  width: 40px;
}
.rest {
  margin-top: 40px;
}
.rest button {
  width: 79px;
}
.rest span {
  margin-right: 25px;
}
.del {
  font-size: 12px;
  margin-left: 20px;
  cursor: pointer;
  color: rgb(119, 119, 238);
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
.v-enter-to {
  opacity: 1;
}
</style>
