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

    const imgDimensions = calculateAspectRatio(
      imageEl.naturalWidth,
      imageEl.naturalHeight,
      448,
      448
    );

    canvasEl.value.width = imgDimensions.width;
    canvasEl.value.height = imgDimensions.height;

    canvasContext.drawImage(imageEl, 0, 0, imgDimensions.width, imgDimensions.height);
  }

  function calculateAspectRatio(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  return { loadImage, canvasEl };
}
