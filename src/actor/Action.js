import axios from 'axios';
import { CODE } from '../Config';
import { Storage } from '../Utils';

// 태스크의 데이터를 가져오는 방식은 일반적인 통신 방식으로 수행
// 이벤트 및 데이터 그리고 성능 문제로 인해 데이터를 가져오는건 일반적인 통신으로 하자.

const LOGIN = () => {
  const url = global.loginurl || "/signin";
  console.dir(url);
  return url;
};

export function go(url, value = {}) {
  // console.dir(global.hist.length);
  Storage.setLocalItem(url, value);
  // window.location.href = url;
  global.hist ? global.hist.push(url, { ...value }) : (window.location.href = url);
}

export function open(url, value) {
  Storage.setLocalItem(url, value);
  window.open(url);
}

export function getParam(url = null) {
  if (window && window.history) {
    const path = url || window.location.pathname;
    const sparam = Storage.getLocalItem(path);

    const param = window.history.state;
    // console.dir(param);
    return param ? param.state : (sparam || null);
  } else {
    const path = url || window.location.pathname;
    return Storage.getLocalItem(path);
  }
}

export function popParam(url = null) {
  // if(window && window.history) {
  //   const param = window.history.state;
  //   console.dir(param);
  //   // window.history.state = null;
  //   return param;
  // } else {
  const path = url || window.location.pathname;
  const param = Storage.getLocalItem(path);
  Storage.removeLocalItem(path);
  return param;
  // }
}

export function doList(url, value = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios.patch(url, { params: { ...value } }).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else if (data.code === CODE.SUCCESS) {
        const isPage = data.page != null && data.max_page != null ? true : false;
        let result = { data: data.value, total: data.total, page: 1, max: 1 };

        if (isPage) {
          result = {
            ...data, 'loaded': true, 'list': data.value,
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
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
}

export function doSelect(url, value = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios.get(url, { params: { ...value } }).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else if (data.code === CODE.SUCCESS) {
        resolve({ 'code': data.code, 'result': data.value, ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
}

export function doInsert(url, value = null, list = null, onEvent = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();
  const options = { onUploadProgress: (e) => onEvent && onEvent('progress', e) };

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios.post(url, value, options).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else if (data.code === CODE.SUCCESS) {
        const result = list == null ? data.value : [...list, data.value];
        resolve({ 'code': data.code, 'result': result, ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
};

export function doUpdate(url, value = null, list = null, onEvent = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();
  const options = { onUploadProgress: (e) => onEvent && onEvent('progress', e) };

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios.put(url, value, options).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else if (data.code === CODE.SUCCESS) {
        const result = list == null ? data.value : list.map(item => { if (item.rowid === data.value.rowid) item = data.value; return item; });
        resolve({ 'code': data.code, 'result': result, 'item': data.item ? data.item : '', ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
};

export function doDelete(url, value, list) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios.delete(url, { params: { ...value } }).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        const result = list == null ? data.value : list.filter(item => item.rowid !== data.value);
        resolve({ 'code': data.code, 'result': result, ...data });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    }).catch(error => {
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
};


export function doUpload(url, value = null, onEvent = null) {
  axios.defaults.headers.common['Authorization'] = Storage.getToken();

  return new Promise((resolve, reject) => {
    if (!url) { alert('is not url'); reject(); return; };
    axios({
      method: 'put',
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: value,
      maxBodyLength: 100 * 1024 * 1024,
      maxContentLength: 100 * 1024 * 1024,
      onUploadProgress: (e) => onEvent && onEvent('progress', e),
    }).then((res) => {
      const { status, data } = res;
      if (data.code === CODE.LOGINERR || status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else if (data.code === CODE.SUCCESS) {
        resolve({ 'code': data.code, 'result': data.value, 'item': data.item ? data.item : '', ...data });
      } else {
        resolve({ 'code': data.code, 'result': data.value, 'err': data.value });
      }
    }).catch(error => {
      const { status = -1, data } = error ? error.response : { status: -1, data: null };
      if (status === 500) {
        window.location.href = data.value ? data.value : LOGIN();
      } else {
        console.log(error)
      }
    });
  })
};

export function doRun(url, value = null) {
  return new Promise((resolve, reject) => {
    axios.post(url, value).then(({ data }) => {
      if (data.code === CODE.SUCCESS) {
        resolve({ 'code': data.code, 'result': data.value });
      } else {
        resolve({ 'code': data.code, 'err': data.value });
      }
    })
  })
}