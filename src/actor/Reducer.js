import { combineReducers } from 'redux';

const T = {
  CONFIRM: 'CONFIRM',
  ALERT: 'ALERT',
  LAYOUT: 'LAYOUT',
  MODAL: 'MODAL',
  SIDEMENU: 'SIDEMENU',
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  SHOW: 'SHOW',
  HIDE: 'HIDE',
}

export function openConfirm(value) {
  return { 'type': T.CONFIRM, 'act': T.OPEN, 'value': value }
}

export function closeConfirm(value) {
  return { 'type': T.CONFIRM, 'act': T.CLOSE, 'value': value }
}

export function showAlert(value) {
  return { 'type': T.ALERT, 'act': T.OPEN, 'value': value }
}

//event = 'show/hide'
export function eventLayout(value) {
  return { 'type': T.LAYOUT, 'act': value.act, 'value': value }
}

export function openModal(value) {
  return { 'type': T.MODAL, 'act': T.OPEN, 'value': value }
}

export function openSidemenu(value) {
  return { 'type': T.SIDEMENU, 'act': T.OPEN, 'value': value }
}

const initialState = {
  // confirm: {},
}

const confirm = (state = initialState, action) => {
  const { type, act, value } = action;
  return (type === T.CONFIRM) ? (act === T.OPEN) ? { ...state, ...value } : { show: false } : state;
};

const alert = (state = initialState, action) => {
  const { type, act, value } = action;
  return (type === T.ALERT) ? (act === T.OPEN) ? { ...state, ...value } : { ...state, show: false } : state;
};

const layout = (state = initialState, action) => {
  const { type, value } = action;
  return (type === T.LAYOUT) ? { ...state, ...value } : state;
};

const modal = (state = initialState, action) => {
  const { type, act, value } = action;
  return (type === T.MODAL) ? (act === T.OPEN) ? { ...state, ...value } : { ...state, show: false } : state;
};

const sidemenu = (state = initialState, action) => {
  const { type, act, value } = action;
  return (type === T.SIDEMENU) ? (act === T.OPEN) ? { ...state, ...value } : { ...state, show: false } : state;
};

export default combineReducers({
  confirm,
  alert,
  layout,
  modal,
  sidemenu,
});