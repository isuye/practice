import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var data = [{
  topic_name: '题目一',
  topin_answer: [{
    answer_id: 1,
    answer_name: '想一想1',
    answer_right: 1 // 答案是否正确,0为正确,1 为错误
  },
  {
    answer_id: 2,
    answer_name: '想一想',
    answer_right: 1
  },
  {
    answer_id: 3,
    answer_name: '正确答案',
    answer_right: 0
  },
  {
    answer_id: 4,
    answer_name: '想一想',
    answer_right: 1
  }
  ]
},
{
  topic_name: '题目二',
  topin_answer: [{
    answer_id: 1,
    answer_name: '想一想2',
    answer_right: 1
  },
  {
    answer_id: 2,
    answer_name: '想一想',
    answer_right: 1
  },
  {
    answer_id: 3,
    answer_name: '正确答案',
    answer_right: 0
  },
  {
    answer_id: 4,
    answer_name: '想一想',
    answer_right: 1
  }
  ]
},
{
  topic_name: '题目三',
  topin_answer: [{
    answer_id: 1,
    answer_name: '想一想3',
    answer_right: 1
  },
  {
    answer_id: 2,
    answer_name: '想一想',
    answer_right: 1
  },
  {
    answer_id: 3,
    answer_name: '正确答案',
    answer_right: 0
  },
  {
    answer_id: 4,
    answer_name: '想一想',
    answer_right: 1
  }
  ]
}
]

export default new Vuex.Store({
  state: {
    data: data,
    answerList: []
  },
  mutations: {
    addAnswer: function (state, value) {
      state.answerList.push(value)
    },
    clear (state) {
      state.answerList = []
    }
  },
  actions: {

  }
})
