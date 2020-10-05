<template>
  <div>
    <table>
      <tr>
        <th>案件</th>
        <th>稼働時間</th>
        <th>休憩時間</th>
      </tr>
      <div v-for="(project, i) in projectList" :key="i">
        <tr>
          <td>{{ project.name }}</td>
          <td>{{ project.workingTime }}</td>
          <td>{{ project.restTime }}</td>
        </tr>
      </div>
    </table>
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
</style>
