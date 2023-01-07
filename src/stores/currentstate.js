import { defineStore } from "pinia";

export const useCurrentStore = defineStore({
  id: 'current', 
  state: () => ({
    currentId: -1,
    error: false,
    errorMsg: '',
    currentMsg: 0,
    currentPost: -2,
    windowWidth: 0,
  }),
  getters: {
    getWindow: (state) => {
      return 991 < state.windowWidth;
    },
  },
  actions: {
    setUser(i) {
      this.currentId = parseInt(i);
    },
    setError(props) {
      this.errorMsg = (this.error || this.currentId === -1 ? '' : props)
      this.error = !this.error;
    },
    setMsg(m) {
      this.currentMsg = parseInt(m);
    },
    setPost(p) {
      this.currentPost = p
    },
    setWindowWidth(w) {
      this.windowWidth = w;
    },
  },
});


/**
 * import { defineStore } from "pinia";

export const useCurrentStore = defineStore({
  id: 'current',
  state: () => ({
    currentId: -1,
    error: false,
    errorMsg: '',
    currentMsg: 0,
    windowWidth: 0,
  }),
  getters: {
    getWindow: (state) => {
      return 991 < state.windowWidth;
    },
  },
  actions: {
    setUser(i) {
      this.currentId = i;
    },
    setError({...props}) {
      this.errorMsg = (this.error ? '' : props.errMsg)
      this.error = !this.error;
    },
    setMsg(m) {
      this.currentMsg = m;
    },
    setWindowWidth(w) {
      this.windowWidth = w;
    },
  },
});

 */