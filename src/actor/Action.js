import axios from 'axios';
import { CODE } from 'svc/Enum';
import { Storage } from 'object/src/Utils';

// 태스크의 데이터를 가져오는 방식은 일반적인 통신 방식으로 수행
// 이벤트 및 데이터 그리고 성능 문제로 인해 데이터를 가져오는건 일반적인 통신으로 하자.

const LOGIN = "/login";

export function go(url, value) {
  Storage.setLocalItem(url, value);
  window.location.href = url;
  // this.props.history.push(URL.NOTEBOOK, { rowid: data.dashid });
}

export function getParam(url = null) {
  const path = url || window.location.pathname;
  return Storage.getLocalItem(path);
}

export function doList(url, value = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    axios.patch(url, { params: { ...value } }).then((res) => {
      const {status, data} = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else if (data.code === CODE.SUCCESS) {
        const isPage = data.page != null && data.max_page != null ? true : false;
        let result = { data: data.value, total: data.total, page: 1, max: 1 };

        if (isPage) {
          result = { ...data, 'loaded': true, 'list': data.value,
            'loading': { 'show': false },
            'page': { 'current': data.page, 'max': data.max_page, 'total': data.total }
          };

          delete (result['max_page']);
          delete (result['total']);
          delete (result['value']);
        }

        resolve({ 'code': data.code, 'result': result, ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value, ...data });
      }
    }).catch(error => {
      const {status, data} = error.response;
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else {
        console.log(error)
      }
    });
  })
}

export function doSelect(url, value = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    axios.get(url, { params: { ...value } }).then((res) => {
      const {status, data} = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else if (data.code === CODE.SUCCESS) {
        resolve({ 'code': data.code, 'result': data.value, ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const {status, data} = error.response;
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else {
        console.log(error)
      }
    });
  })
}

export function doInsert(url, value = null, list = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    axios.post(url, value).then((res) => {
      const {status, data} = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else if (data.code === CODE.SUCCESS) {
        const result = list == null ? data.value : [...list, data.value];
        resolve({ 'code': data.code, 'result': result });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const {status, data} = error.response;
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else {
        console.log(error)
      }
    });
  })
};

export function doUpdate(url, value = null, list) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();
  
  return new Promise((resolve, reject) => {
    axios.put(url, value).then((res) => {
      const {status, data} = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else if (data.code === CODE.SUCCESS) {
        const result = list == null ? data.value : list.map(item => { if (item.rowid === data.value.rowid) item = data.value; return item; });
        resolve({ 'code': data.code, 'result': result, 'item': data.item ? data.item : '' });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const {status, data} = error.response;
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else {
        console.log(error)
      }
    });
  })
};

export function doDelete(url, value = null, list) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params: { ...value } }).then((res) => {
      const {status, data} = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        const result = list == null ? data.value : list.filter(item => item.rowid !== data.value);
        resolve({ 'code': data.code, 'result': result });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const {status, data} = error.response;
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN;
      } else {
        console.log(error)
      }
    });
  })
};