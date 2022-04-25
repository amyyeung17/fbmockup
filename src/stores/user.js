import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: [
      {
        name: "Jane Doe",
        id: 0,
        desc: "Ready to take on the world!",
        location: "NYC",
        friends: [1, 4, 7, 8],
      },
      {
        name: "Alice Foo",
        id: 1,
        desc: "don't post a lot",
        location: "Pittsburgh, PA",
        friends: [0, 2, 5, 9],
      },
      {
        name: "Bob Bar",
        id: 2,
        desc: "find me near the beach this weekend!",
        location: "@ the beach!",
        friends: [1, 3, 4, 5, 6, 7],
      },
      {
        name: "Eve Smith",
        id: 3,
        desc: "foodie",
        location: "probably at a restaurant",
        friends: [2, 4, 5, 6, 8, 9],
      },
      {
        name: "John Miller",
        id: 4,
        desc: "did I mention I was stressed yet",
        location: "my cubicle",
        friends: [0, 3, 7, 9],
      },
      {
        name: "Cassie Lin",
        id: 5,
        desc: "check out my channel!",
        location: "San Francisco, CA",
        friends: [1, 2, 3, 8],
      },
      {
        name: "Ron Scott",
        id: 6,
        desc: "party @ 4 today",
        location: "Miami, FL",
        friends: [2, 3, 7, 8, 9],
      },
      {
        name: "Keith Lee",
        id: 7,
        desc: "currently at school",
        location: "Houston, TX",
        friends: [0, 2, 4, 6, 9],
      },
      {
        name: "Amber Rivera",
        id: 8,
        desc: "shooting a new film!",
        location: " secret!",
        friends: [0, 3, 5, 6],
      },
      {
        name: "Connor Morgan",
        id: 9,
        desc: "Ron and I are throwing a party @ 4 today!",
        location: "Miami, Fl",
        friends: [1, 3, 4, 5, 6, 7],
      },
    ],
  }),
  getters: {
    getUser: (state) => {
      return (id) => {
        for (const u of state.user) {
          if (u.id === parseInt(id)) {
            return u;
          }
        }
        return -1;
      };
    },
    getUsername: (state) => {
      return (id) => {
        const u = state.getUser(id);
        if (u === -1) {
          return " Guest User";
        }
        return u.name;
      };
    },
    getFriends: (state) => {
      return (id) => {
        const u = state.getUser(id);
        let friend = state.user.filter((v) => {
          return u.friends.indexOf(v.id) !== -1;
        });
        return friend;
      };
    },
  },
  actions: {
    editFriends(id, currentId) {
      const parseId = parseInt(id);
      const user = this.getUser(parseId);
      if (user.friends.indexOf(currentId) !== -1) {
        user.friends.splice(user.friends.indexOf(currentId), 1);
      } else {
        user.friends.push(currentId);
      }
    },
  },
});
