import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("theme", ["themeType"]),
    themeName() {
      return `theme-${this.themeType}`;
    }
  }
};
