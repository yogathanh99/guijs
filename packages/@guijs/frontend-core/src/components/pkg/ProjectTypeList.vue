<script>
import ProjectTypeLogo from '../project/ProjectTypeLogo.vue'

export default {
  components: {
    ProjectTypeLogo,
  },

  props: {
    projectTypes: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="flex flex-col items-stretch">
    <VButton
      v-for="pt of projectTypes"
      :key="pt.id"
      :to="{
        name: 'project-type-packages',
        params: {
          ...$route.params,
          projectTypeId: pt.id,
        },
      }"
      align="left"
      square
      extend
      class="btn-md hover:bg-primary-100 dark-hover:bg-primary-900"
      :class="{
        active: $route.params.projectTypeId === pt.id,
      }"
    >
      <i
        v-if="pt.icon"
        class="material-icons mr-4 text-gray-600 dark:text-gray-400"
      >
        {{ pt.icon }}
      </i>
      <ProjectTypeLogo
        v-else
        :projectType="pt"
        class="w-6 h-6 rounded mr-4 flex-none"
      />
      <div class="flex-1 text-left w-0 truncate">
        {{ $t(pt.name) }}
      </div>
    </VButton>
  </div>
</template>

<style lang="postcss" scoped>
.active {
  @apply bg-primary-100;
  .mode-dark & {
    @apply bg-primary-900;
  }
}
</style>
