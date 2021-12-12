<template>
  <div>
    <Sessions v-if="showSessions"></Sessions>
    <Plans v-if="!showSessions"></Plans>
  </div>
</template>

<script>
export default {
  name: "Home",

};
</script>
