<script lang="ts" setup>
import { useMutation } from '@pinia/colada';
import { onMounted } from 'vue';

const { mutate, recentlySuccessful } = useMutation({
  mutation: () => new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mutation completed');
      resolve('done');
    }, 1000);
  }),
})

onMounted(() => {
  console.log(recentlySuccessful);

  mutate();
})
</script>

<template>
  <div>
    <p>Recently successful: {{ recentlySuccessful }}</p>
  </div>
</template>
