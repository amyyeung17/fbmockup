import { defineStore } from "pinia";
import { useCurrentStore } from "@/stores/currentstate";

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    message: [
      {
        id: 0,
        convo: [
          {
            mid: 1,
            msg: [
              { time: 0, user: 0, m: "hey alice" },
              { time: 1, user: 0, m: "can you see this?" },
              { time: 2, user: 1, m: "got it" },
              { time: 3, user: 0, m: "awesome" },
            ],
          },
          {
            mid: 4,
            msg: [{ time: 4, user: 4, m: "send over the info please" }],
          },
          {
            mid: 7,
            msg: [
              { time: 0, user: 7, m: "thank you for the gift! I loved it" },
              { time: 1, user: 0, m: "you're welcome, I'm glad you liked it!" },
            ],
          },
        ],
      },
      {
        id: 1,
        convo: [
          {
            mid: 0,
            msg: [
              { time: 0, user: 0, m: "hey alice" },
              { time: 1, user: 0, m: "can you see this?" },
              { time: 2, user: 1, m: "got it" },
              { time: 3, user: 0, m: "awesome" },
            ],
          },
        ],
      },
      { id: 2, convo: [] },
      {
        id: 3,
        convo: [
          {
            mid: 5,
            msg: [
              {
                time: 0,
                user: 8,
                m: "I'm actually really close to you right now! Want to grab lunch?",
              },
              {
                time: 1,
                user: 3,
                m: "Awesome, what are you feeling food-wise?",
              },
              { time: 2, user: 8, m: "How about the new place downtown?" },
              { time: 3, user: 3, m: "let's go for ice cream after!" },
            ],
          },
        ],
      },
      {
        id: 4,
        convo: [
          {
            mid: 0,
            msg: [{ time: 4, user: 4, m: "send over the info please" }],
          },
        ],
      },
      {
        id: 5,
        convo: [
          {
            mid: 9,
            msg: [
              { time: 0, user: 5, m: "party still going on right?" },
              { time: 1, user: 9, m: "yep, see you soon" },
            ],
          },
        ],
      },
      {
        id: 6,
        convo: [
          {
            mid: 9,
            msg: [
              { time: 0, user: 6, m: "got all the stuff ready" },
              { time: 1, user: 9, m: "ready on my end too" },
              { time: 2, user: 9, m: "its going to a good one" },
              { time: 3, user: 6, m: "for sure, its time to have a blast" },
              { time: 4, user: 9, m: "don't forget to bring the speakers" },
              { time: 5, user: 6, m: "you got it, see you soon" },
            ],
          },
        ],
      },
      {
        id: 7,
        convo: [
          {
            mid: 0,
            msg: [
              { time: 0, user: 7, m: "thank you for the gift! I loved it" },
              { time: 1, user: 0, m: "you're welcome, I'm glad you liked it!" },
            ],
          },
          { mid: 9, msg: [{ time: 0, user: 9, m: "party is at 4 today!" }] },
        ],
      },
      {
        id: 8,
        convo: [
          {
            mid: 3,
            msg: [
              {
                time: 0,
                user: 8,
                m: "I'm actually really close to you right now! Want to grab lunch?",
              },
              {
                time: 1,
                user: 3,
                m: "Awesome, what are you feeling food-wise?",
              },
              { time: 2, user: 8, m: "How about the new place downtown?" },
              { time: 3, user: 3, m: "let's go for ice cream after" },
            ],
          },
        ],
      },
      {
        id: 9,
        convo: [
          {
            mid: 5,
            msg: [
              { time: 0, user: 5, m: "party still going on right?" },
              { time: 1, user: 9, m: "yep, see you soon" },
            ],
          },
          {
            mid: 6,
            msg: [
              { time: 0, user: 6, m: "got all the stuff ready" },
              { time: 1, user: 9, m: "ready on my end too" },
              { time: 2, user: 9, m: "its going to a good one" },
              { time: 3, user: 6, m: "for sure, its time to have a blast" },
              { time: 4, user: 9, m: "don't forget to bring the speakers" },
              { time: 5, user: 6, m: "you got it, see you soon" },
            ],
          },
          { mid: 7, msg: [{ time: 0, user: 9, m: "party is at 4 today!" }] },
        ],
      },
    ],
  }),
  getters: {
    getMessage: (state) => {
      return (id, type) => {
        let x = parseInt(id);
        const currentStore = useCurrentStore();
        for (const m of state.message) {
          if (m.id === x) {
            if (type === "all") {
              return m.convo;
            } else {
              for (const v of m.convo) {
                if (v.mid === currentStore.selectedMessage) {
                  return v;
                }
              }
            }
          }
        }
      };
    },
    getActiveMessages: (state) => {
      return (id, currentId) => {
        const userMessage = state.getMessage(currentId, "all");
        for (const v of userMessage) {
          if (v.mid === id) {
            return true;
          }
        }
        return false;
      };
    },
  },
  actions: {
    addNewMessage(id) {
      const currentStore = useCurrentStore();
      for (const m of this.message) {
        if (m.id === currentStore.currentId) {
          if (m.convo.length !== 0) {
            for (const mes of m.convo) {
              if (mes.mid === id) {
                currentStore.setSelectedMessage(id);
                return;
              }
            }
          }
          m.convo.push({ mid: id, msg: [] });
          currentStore.setSelectedMessage(id);
        }
        if (m.id === id) {
          m.convo.push({ mid: currentStore.currentId, msg: [] });
        }
      }
    },
    sendMessage(content) {
      const currentStore = useCurrentStore();
      const mes = this.getMessage(currentStore.currentId);
      const recipient = this.getMessage(currentStore.selectedMessage, "all");
      if (content !== "") {
        mes.msg.push({
          time: mes.msg.length,
          user: currentStore.currentId,
          m: content,
        });
        for (const m of recipient) {
          if (m.mid === currentStore.currentId) {
            m.msg.push({
              time: mes.msg.length,
              user: currentStore.currentId,
              m: content,
            });
          }
        }
      }
    },
    cleanEmptyConvo() {
      for (let i = 0; i < this.message.length; i++) {
        if (this.message[i].convo.length !== 0) {
          for (let j = 0; j < this.message[i].convo.length; j++) {
            if (this.message[i].convo[j].msg.length === 0) {
              this.message[i].convo.splice(j, 1);
            }
          }
        }
      }
    },
  },
});
