import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";
import { useCommentStore } from "@/stores/comment";

//getStatus - not in use

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    post: [
      {
        pid: 0,
        id: 0,
        content: 'Hello world!',
        time: '12:00',
        likes: [2, 3],
        edit: false,
        postLocation: 0,
      },
      {
        pid: 1,
        id: 3,
        content: `Dreaming about yesterday's dinner`,
        time: '01:00',
        likes: [4],
        edit: false,
        postLocation: 3,
      },
      {
        pid: 2,
        id: 4,
        content: 'overworked and tired. help',
        likes: [0, 1, 2],
        time: '01:30',
        edit: false,
        postLocation: 4,
      },
      {
        pid: 3,
        id: 5,
        content: 'new content coming out soon!',
        likes: [1, 2, 8],
        time: '02:30',
        edit: false,
        postLocation: 5,
      },
      {
        pid: 4,
        id: 3,
        content: 'Lunch was great today. A fresh poke bowl with coffee.',
        likes: [2, 4, 5, 8],
        time: '03:30',
        edit: false,
        postLocation: 3,
      },
      {
        pid: 5,
        id: 0,
        content: 'Congrats with finishing the year!',
        likes: [1, 4, 6, 7],
        time: '06:30',
        edit: false,
        postLocation: 7,
      },
      {
        pid: 6,
        id: 6,
        content: 'Throwing a party, be there @ 4!!',
        likes: [7, 8, 9],
        time: '06:30',
        edit: false,
        postLocation: 9,
      },
      {
        pid: 7,
        id: 2,
        content: 'Nothing better than a warm cup of tea before sleep',
        likes: [1, 3, 5],
        time: '07:30',
        edit: false,
        postLocation: 2,
      },
      {
        pid: 8,
        id: 8,
        content: `My friend's new video is hilarious. Give it a watch!`,
        likes: [0, 5, 6],
        time: '08:30',
        edit: false,
        postLocation: 5,
      },
      {
        pid: 9,
        id: 7,
        content: 'I really need a break',
        likes: [4, 9],
        time: '11:30',
        edit: false,
        postLocation: 7,
      },
    ],
  }),
  getters: {
    getStores: () => {
      return () => {
        const userStore = useUserStore()
        const currentStore = useCurrentStore()
        return { currentStore, userStore }
      }
    },
    getPost: (state) => {
      return (pid) => {
        return state.post.find(p => p.pid === parseInt(pid))
      };
    },
    getCurrentPost: (state) => {
      return () => {
        const { currentStore } = state.getStores()
        return state.getPost(currentStore.postId)
      }
    },
    getCurrentLikes: (state) => {
      return (pid) => {
        const { currentStore } = state.getStores()
        return state.getPost(pid).likes.indexOf(currentStore.userId);
      };
    },
    getFilterId: (state) => {
      return (id) => {
        return state.post.filter(p => (p.id === parseInt(id) || p.postLocation === parseInt(id)))
      }
    },
    getFilterAll: (state) => {
      return () => {
        const { currentStore, userStore } = state.getStores()
        const userFriends = userStore.getUser(currentStore.userId).friends
        const userPosts = state.getFilterId(currentStore.userId)
        const friendsPosts = state.post.filter(p => (userFriends.indexOf(p.id) !== -1) || (userFriends.indexOf(p.postLocation) !== -1) && ![...userPosts.map(u => u.pid)].includes(p.pid))
        return [...userPosts, ...friendsPosts].sort((a, b) => a.time - b.time)
      }
    }
  },
  actions: {
    setEdit(pid) {
      const { currentStore } = this.getStores()
      if (currentStore.postId !== -2) {
        const oldPost = this.getCurrentPost()
        oldPost.edit = !oldPost.edit
      }
      currentStore.setPost(pid)
      const p = this.getPost(pid);
      p.edit = !p.edit;
    },
    addLikes(pid) {
      const p = this.getPost(pid);
      const currentStore = useCurrentStore();
      if (this.getCurrentLikes(pid) !== -1) {
        p.likes.splice(this.getCurrentLikes(pid), 1);
      } else {
        p.likes.push(currentStore.userId);
      }
    },
    enterPost(edit, type) {
      const { currentStore } = this.getStores()
      const p = this.getCurrentPost()
      if (type === 'save') {
        p.content = edit
      }
      p.edit = !p.edit;
      currentStore.setPost(-2)
    },
    update(newPost, postLocation) {
      const currentStore = useCurrentStore();
      const commentStore = useCommentStore();
      if (newPost !== '' && currentStore.userId !== -1) {
        this.post.push({
          pid: this.post.length,
          id: currentStore.userId,
          content: newPost,
          time: `13:${this.post.length + 1}`,
          likes: [],
          edit: false,
          postLocation: parseInt(postLocation),
        });
        commentStore.update(this.post.length - 1);
      } else {
        currentStore.setError('Input box can not be empty'); 
      }
    },
  },
});
