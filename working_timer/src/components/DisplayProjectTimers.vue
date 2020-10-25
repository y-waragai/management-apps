<template>
  <ul class="timers">
    <li>
        <strong class="header1">案件</strong>
        <strong class="header2">稼働時間</strong>
    </li>
    <transition-group tag="ul">
      <li v-for="(project, i) in projectList" :key="i">
        <span class="name">{{ project.name }}</span>
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
