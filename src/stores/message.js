import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCurrentStore } from "@/stores/currentstate";

export const useMessageStore = defineStore(
  'message', () => {
    const currentStore = useCurrentStore();
    const message = ref([
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
    )

    const getAllMsgs = computed(() => {
      return (id) => message.value.find(m => m.id === parseInt(id)).convo
    })

    const getMsg = computed(() => {
      return (id, mid) => getAllMsgs.value(id).find(v => v.mid === parseInt(mid))
    })

    const getCurrentMsg = computed(() => {
      return (id) => getMsg.value(id, currentStore.currentMsg)
    })
  
    const getAllCurrent = computed(() => {return getAllMsgs.value(currentStore.currentId)})

    function update(id) {
      if (getAllCurrent.value.length === 0 || (getAllCurrent.value.length !== 0 && [...getAllCurrent.value.map(s => s.mid)].indexOf(id) === -1)) {
        getAllCurrent.value.push({ mid: id, msg: [] })
        getAllMsgs.value(id).push({ mid: currentStore.currentId, msg: [] })
      }
      currentStore.setMsg(id);
    }

    function enterMsg(content) {
      const mes = getCurrentMsg.value(currentStore.currentId);
      const recipient = getMsg.value(currentStore.currentMsg, currentStore.currentId)
      if (content !== '') {
        mes.msg.push({time: mes.msg.length, user: currentStore.currentId, m: content});
        recipient.msg.push({time: mes.msg.length, user: currentStore.currentId, m: content})
      }
    }

    function removeEmpty(currentId) {
      const currentMessage = getAllMsgs.value(currentId)
      if (currentMessage.length !== 0) {
        for (let j = 0; j < currentMessage.length; j++) {
          if (currentMessage[j].msg.length === 0) {
            currentMessage.splice(j, 1);
          }
        }
      }
    }
    
    return { message, getAllMsgs, getMsg, getCurrentMsg, getAllCurrent, update, enterMsg, removeEmpty}
  }
);
