import { ref } from 'vue';

export default function useCanvas() {
  const canvasEl = ref<HTMLCanvasElement | null>(null);
  let canvasContext: CanvasRenderingContext2D | null = null;
  const imageEl = new Image();

  function loadImage(url: string) {
    if (!canvasEl.value) return;

    canvasContext = canvasEl.value.getContext('2d');

    imageEl.addEventListener('load', drawOriginalImage);
    imageEl.src = url;
  }

  function drawOriginalImage() {
    if (!canvasContext || !canvasEl.value) return;

    canvasContext.drawImage(imageEl, 0, 0);
  }

  return { loadImage, canvasEl };
}
