import { assign, createMachine } from 'xstate'

import { questions } from '../constants/questions'

export const quizMachine = createMachine(
  {
    id: 'quiz',
    initial: 'home',
    context: {
      question: questions[0],
    },
    states: {
      home: {
        on: {
          START: {
            target: 'prepare',
            actions: ['pickQuestion'],
          },
        },
      },
      prepare: {
        on: { RECORD: 'record', QUIT: 'home' },
      },
      record: {
        on: { FINISH: 'finish', QUIT: 'home' },
      },
      finish: {
        on: {
          REDO: 'prepare',
          QUIT: 'home',
        },
      },
    },
  },
  {
    actions: {
      pickQuestion: assign({
        question: () => questions[Math.floor(Math.random() * questions.length)],
      }),
    },
  }
)
