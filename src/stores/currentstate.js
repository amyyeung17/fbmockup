import { defineStore } from "pinia";

export const useCurrentStore = defineStore({
  id: "current",
  state: () => ({
    currentUser: "Guest User",
    currentId: -1,
    newPost: "",
    error: false,
    errorMessage: "",
    selectedMessage: 0,
    guest: true,
    windowWidth: 0,
  }),
  getters: {
    getCurrentId: (state) => {
      return () => {
        state.currentId;
      };
    },
    getWindow: (state) => {
      return 991 < state.windowWidth;
    },
  },
  actions: {
    setUser(u, i) {
      this.currentUser = u;
      this.currentId = i;
      this.newPost = "";
    },
    setMessageId(id) {
      this.selectedMessage = id;
    },
    setPost(m) {
      this.newPost = m;
    },
    setError() {
      if (this.error) {
        this.errorMessage = "";
      }
      this.error = !this.error;
    },
    setErrorMessage(e) {
      this.errorMessage = e;
    },
    setEditPost(t) {
      this.editPost = t;
    },
    setSelectedMessage(m) {
      this.selectedMessage = m;
    },
    setGuestUser() {
      this.guest = !this.guest;
    },
    setWindowWidth(w) {
      this.windowWidth = w;
    },
  },
});
