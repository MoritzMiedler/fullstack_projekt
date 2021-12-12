<template>
  <div>
    <Sessions v-if="showSessions"></Sessions>
    <Plans v-if="!showSessions"></Plans>
  </div>
</template>

<script>
import Sessions from "../components/Sessions.vue";
import Plans from "../components/Plans.vue";

export default {
  name: "Home",
  components: {
    Sessions,
    Plans,
  },
  data() {
    return {
      showSessions: true,
    };
  },
};
</script>
