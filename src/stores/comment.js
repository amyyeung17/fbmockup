import { defineStore } from "pinia";
import { useCurrentStore } from "@/stores/currentstate";

export const useCommentStore = defineStore({
  id: "comment",
  state: () => ({
    comment: [
      {
        pid: 0,
        display: false,
        reply: false,
        comments: [
          { id: 1, c: "Hello World!!" },
          { id: 2, c: "classic" },
        ],
      },
      { pid: 1, display: false, reply: false, comments: [] },
      {
        pid: 2,
        display: false,
        reply: false,
        comments: [
          {
            id: 4,
            c: "Update, still tired and overworkedsdfsdfdsfsdfdsfdsfsdfsdfsdfsdfsdfsdfsdfwetsdgasetgesfsdfsetgdgrysefsdtg4egdv",
          },
        ],
      },
      { pid: 3, display: false, reply: false, comments: [] },
      {
        pid: 4,
        display: false,
        reply: false,
        comments: [{ id: 8, c: "pics please!" }],
      },
      {
        pid: 5,
        display: false,
        reply: false,
        comments: [{ id: 7, c: "thank you!" }],
      },
      {
        pid: 6,
        display: false,
        reply: false,
        comments: [{ id: 9, c: "biggest party of the year" }],
      },
      {
        pid: 7,
        display: false,
        reply: false,
        comments: [
          { id: 1, c: "Agreed!" },
          { id: 4, c: "Jealous" },
        ],
      },
      {
        pid: 8,
        display: false,
        reply: false,
        comments: [{ id: 5, c: "thanks for the support <3" }],
      },
      {
        pid: 9,
        display: false,
        reply: false,
        comments: [
          { id: 4, c: "tell me about it" },
          { id: 9, c: "almost done, you got it" },
          { id: 2, c: "get some coffee!" },
        ],
      },
    ],
  }),
  getters: {
    getMain: (state) => {
      return (pid) => {
        for (const c of state.comment) {
          if (c.pid === pid) {
            return c;
          }
        }
      };
    },
    getComments: (state) => {
      return (pid) => {
        return state.getMain(pid).comments;
      };
    },
    getDisplay: (state) => {
      return (pid, zero) => {
        return zero ? zero : state.getMain(pid).display;
      };
    },
    getInputDisplay: (state) => {
      return (pid) => {
        return state.getMain(pid).reply;
      };
    },
  },
  actions: {
    setDisplay(pid) {
      const c = this.getMain(pid);
      c.display = !c.display;
    },
    setInputDisplay(pid) {
      const c = this.getMain(pid);
      c.reply = !c.reply;
    },
    enterReply(pid, r) {
      const c = this.getMain(pid);
      const current = useCurrentStore();
      c.comments.push({ id: current.currentId, c: r });
      c.reply = !c.reply;
    },
    addComment(c) {
      this.comment.push(c);
    },
  },
});
