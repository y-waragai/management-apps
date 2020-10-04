<template>
  <div>
    <div v-for="(project, i) in projectList" :key="i">
      <div class="p">
        {{ project.name }}
        {{ project.startTime }}
        {{ project.restTime }}
        {{ project.endTime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayProjectTimers',
  props: {
    projectList: Array,
  },
};
</script>

<style scoped>
  .p{
    display: block;
  }
</style>
