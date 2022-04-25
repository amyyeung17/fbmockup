import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";
import { useCommentStore } from "@/stores/comment";

//getStatus - not in use

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    post: [
      {
        pid: 0,
        id: 0,
        content: "Hello world!",
        time: "12:00",
        likes: [2, 3],
        edit: false,
        postLocation: 0,
      },
      {
        pid: 1,
        id: 3,
        content: "Dreaming about yesterday's dinner",
        time: "1:00",
        likes: [4],
        edit: false,
        postLocation: 3,
      },
      {
        pid: 2,
        id: 4,
        content: "overworked and tired. help",
        likes: [0, 1, 2],
        time: "1:30",
        edit: false,
        postLocation: 4,
      },
      {
        pid: 3,
        id: 5,
        content: "new content coming out soon!",
        likes: [1, 2, 8],
        time: "2:30",
        edit: false,
        postLocation: 5,
      },
      {
        pid: 4,
        id: 3,
        content: "Lunch was great today. A fresh poke bowl with coffee.",
        likes: [2, 4, 5, 8],
        time: "3:30",
        edit: false,
        postLocation: 3,
      },
      {
        pid: 5,
        id: 0,
        content: "Congrats with finishing the year!",
        likes: [1, 4, 6, 7],
        time: "6:30",
        edit: false,
        postLocation: 7,
      },
      {
        pid: 6,
        id: 6,
        content: "Throwing a party with my bro, be there @ 4!!",
        likes: [7, 8, 9],
        time: "6:30",
        edit: false,
        postLocation: 9,
      },
      {
        pid: 7,
        id: 2,
        content: "Nothing better than a warm cup of tea before sleep",
        likes: [1, 3, 5],
        time: "7:30",
        edit: false,
        postLocation: 2,
      },
      {
        pid: 8,
        id: 8,
        content: "My friend's new video is hilarious. Give it a watch!",
        likes: [0, 5, 6],
        time: "8:30",
        edit: false,
        postLocation: 5,
      },
      {
        pid: 9,
        id: 7,
        content: "I really need a break",
        likes: [4, 9],
        time: "11:30",
        edit: false,
        postLocation: 7,
      },
    ],
  }),
  getters: {
    getPost: (state) => {
      return (pid) => {
        for (const p of state.post) {
          if (p.pid === pid) {
            return p;
          }
        }
      };
    },
    getCurrentLikes: (state) => {
      return (pid) => {
        const post = state.getPost(pid);
        const currentStore = useCurrentStore();
        return post.likes.indexOf(currentStore.currentId);
      };
    },
    getUserPosts: (state) => {
      return (id) => {
        let post = state.post.filter((p) => {
          return parseInt(id) === p.id;
        });
        return post;
      };
    },
    getStatus: (state) => {
      return (pid) => {
        let u = [];
        const post = state.getPost(pid);
        const user = useUserStore();
        for (const l of post.likes) {
          u.push(user.getUsername(l));
        }
        return u;
      };
    },
  },
  actions: {
    //come back to this - argument for return statement??
    setEdit(pid) {
      const p = this.getPost(pid);
      p.edit = !p.edit;
      return p.edit;
    },
    addLikes(pid) {
      const p = this.getPost(pid);
      const currentStore = useCurrentStore();
      if (this.getCurrentLikes(pid) !== -1) {
        p.likes.splice(this.getCurrentLikes(pid), 1);
      } else {
        p.likes.push(currentStore.currentId);
      }
    },
    enterPost(pid, edit, option) {
      for (let i = 0; i < this.post.length; i++) {
        if (this.post[i].pid === parseInt(pid)) {
          if (option === "save") {
            const update = { ...this.post[i], edit: false, content: edit };
            this.post.splice(i, 1, update);
          } else {
            this.post[i].edit = !this.post[i].edit;
          }
        }
      }
    },
    createNewPost(newPost, postLocation) {
      const currentStore = useCurrentStore();
      const commentStore = useCommentStore();
      if (newPost !== "" && currentStore.currentId !== -1) {
        this.post.push({
          pid: this.post.length,
          id: currentStore.currentId,
          content: newPost,
          time: "x",
          likes: [],
          edit: false,
          postLocation: postLocation,
        });
        commentStore.addComment({
          pid: this.post.length - 1,
          display: false,
          reply: false,
          comments: [],
        });
        currentStore.setPost("");
      } else {
        currentStore.setError();
        if (currentStore.error) {
          if (currentStore.currentId === -1) {
            currentStore.setErrorMessage(
              currentStore.errorMessage +
                "Can not post as a guest user, please select a user before posting. "
            );
          }
          if (newPost === "") {
            currentStore.setErrorMessage(
              currentStore.errorMessage + "Input box can not be empty"
            );
          }
        } else {
          currentStore.setErrorMessage("");
        }
      }
    },
  },
});
