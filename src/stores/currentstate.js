import { defineStore } from "pinia";

export const useCurrentStore = defineStore({
  id: "current",
  state: () => ({
    userId: -1,
    error: false,
    errorMsg: "",
    recipientId: 0,
    postId: -2,
    windowWidth: 0,
  }),
  getters: {
    getWindow: (state) => {
      return 991 < state.windowWidth;
    },
  },
  actions: {
    setUser(i) {
      this.userId = parseInt(i);
    },
    setError(props) {
      this.errorMsg = this.error || this.userId === -1 ? "" : props;
      this.error = !this.error;
    },
    setMsg(m) {
      this.recipientId = parseInt(m);
    },
    setPost(p) {
      this.postId = p;
    },
    setWindowWidth(w) {
      this.windowWidth = w;
    },
  },
});
