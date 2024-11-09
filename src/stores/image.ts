import { defineStore } from 'pinia';

interface ImageState {
  file: File | null;
  filter: string;
}

export const useImageStore = defineStore('image', {
  state: (): ImageState => ({
    file: null,
    filter: ''
  }),
  actions: {
    upload(event: DragEvent) {
      if (!event.dataTransfer) {
        return;
      }
      const tempFile = event.dataTransfer.files[0];

      if (!tempFile.type.match('image.*')) {
        return;
      }

      this.file = tempFile;
    }
  }
});
