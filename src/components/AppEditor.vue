<template>
  <div class="my-8">
    <canvas ref="canvasEl" width="448" height="448"></canvas>
    <div class="text-white text-xl mt-4">
      <div class="flex justify-center gap-4">
        <button
          v-for="(filter, index) in filters"
          :key="index"
          type="button"
          class="py-4 w-full"
          :class="store.filter === filter ? 'bg-green-600' : 'bg-pink-600'"
          @click="store.filter = store.filter === filter ? '' : filter"
        >
          {{ filter }}
        </button>
      </div>
      <a class="bg-indigo-700 py-4 block w-full mt-2 text-center"> Download </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '@/stores/image.js';
import useCanvas from '@/hooks/use-canvas';
import useReader from '@/hooks/use-reader';

const filters = ['oceanic', 'vintage', 'rosetint'];
const store = useImageStore();
const { canvasEl, loadImage } = useCanvas();

const reader = useReader(store.file, () => {
  if (!reader.result) {
    return;
  }

  const dataURL = reader.result.toString();
  console.log('dataURL ->', dataURL);
  loadImage(dataURL);
});
</script>
