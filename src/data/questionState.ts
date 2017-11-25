import { registerReducer } from '../store';
import { Reducer } from 'redux';

export const SET_ANSWER_STATE = 'support-forms/SET_ANSWER_STATE';
export const SET_NEXT_QUESTION = 'support-forms/SET_NEXT_QUESTION';
export const CLEAR_NEXT_QUESTION = 'support-forms/CLEAR_NEXT_QUESTION';

interface AnswerState {
  questionIndex: number;
  state: any;
}

interface AnswerStateAction {
  type: typeof SET_ANSWER_STATE;
  payload: AnswerState;
}

export function setAnswerStateAction(answerState: AnswerState): AnswerStateAction {
  return {
    type: SET_ANSWER_STATE,
    payload: answerState
  };
}

///

interface NextQuestion {
  questionIndex: number;
  question: string;
}

interface SetNextQuestionAction {
  type: typeof SET_NEXT_QUESTION;
  payload: NextQuestion;
}

export function setNextQuestionAction(nextQuestion: NextQuestion): SetNextQuestionAction {
  return {
    type: SET_NEXT_QUESTION,
    payload: nextQuestion
  };
}

///

interface ClearNextQuestionAction {
  type: typeof CLEAR_NEXT_QUESTION;
  payload: number;
}

export function clearNextQuestionAction(questionIndex: number): ClearNextQuestionAction {
  return {
    type: CLEAR_NEXT_QUESTION,
    payload: questionIndex
  };
}

/////////////////////////////////

export interface QuestionState {
  question: string;
  answerState?: any;
}

interface QuestionStateReducerState {
  questions: QuestionState[];
}

type QuestionStateActions = AnswerStateAction | SetNextQuestionAction | ClearNextQuestionAction;

const questionStateReducer: Reducer<QuestionStateReducerState> =
  function questionStateReducer(state = { questions: [ { question: 'start' } ] },
                                action: QuestionStateActions): QuestionStateReducerState {

  switch (action.type) {
    case SET_ANSWER_STATE:
      // Create new question state object
      state.questions[action.payload.questionIndex] = {
        ...state.questions[action.payload.questionIndex],
        answerState: action.payload.state
      };
      return { ...state, questions: [...state.questions] };

    case SET_NEXT_QUESTION:
      // Truncate the questions
      state.questions.length = action.payload.questionIndex + 1;
      state.questions = state.questions.concat([ { question: action.payload.question } ]);
      return { ...state };

    case CLEAR_NEXT_QUESTION:
      // Truncate the questions
      state.questions.length = action.payload + 1;
      return { ...state };
    }
  return state;
};

registerReducer('questionState', questionStateReducer);

/// Selector

function questionStateQuestionSelector(state: any, index: number): QuestionState {
  return (state.questionState as QuestionStateReducerState).questions[index];
}

function questionStateQuestionsSelector(state: any): QuestionState[] {
  return (state.questionState as QuestionStateReducerState).questions;
}

export { questionStateReducer, questionStateQuestionSelector, questionStateQuestionsSelector };
