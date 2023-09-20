import { Camera, CameraResultType } from "@capacitor/camera";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PageCamera",
  data() {
    return {
      enableCamera: false,
      cameraStart: false,
      imageSrc: ref(""),
    };
  },
  // mounted () {
  //   if (navigator.mediaDevices.getDisplayMedia) {
  //     this.enableCamera = true
  //   }
  // },
  // mounted () {
  //   if (navigator.mediaDevices.getDisplayMedia) {
  //     this.enableCamera = true
  //   }
  // },
  methods: {
    async useCamera() {
      this.imageSrc = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
    },
  },
});
