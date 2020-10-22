import { SCREEN, ST, CODE, EID } from './Config';

const COST = { EUK: "억", MAN: "만", WON: "원", CHEN: "천" }

export const Util = {
  ONE_DAY: (24 * 60 * 60 * 1000),

  makesid(count = 5) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  getScreenType() {
    let type = 's-pc';
    const screen = window.innerWidth;
    if (screen <= SCREEN.TABLET) {
      type = "s-tablet";
    }

    if (screen <= SCREEN.MOBILE) {
      type = "s-mobile";
    }

    return { 'type': type, 'width': screen };
  },

  numberWithCommas(x) { return this.isEmpty(x) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },

  commas(x) { return this.numberWithCommas(x); },

  toShortCost(x) {
    var temp = x;
    if (temp > 99999999) { // 억원 ~
      temp = Math.ceil(temp / 100000000) + `${COST.EUK}${COST.WON}`;
    } else if (temp > 9999999) { // 천만원 ~ 억원
      temp = Math.ceil(temp / 10000000) + `${COST.CHEN}${COST.MAN}${COST.WON}`;
    } else if (temp > 9999) { // 만원 ~ 백만원
      temp = Math.ceil(temp / 10000) + `${COST.MAN}${COST.WON}`;
    } else {
      temp = this.numberWithCommas(x);
    }

    return temp;
  },

  replaceSymbol(value) { return value.replace(/-/gi, ''); },

  replaceAll(value, tag, target = '') { return value ? value.split(tag).join(target) : ''; },

  addSymbol(value, symbol) {
    if (value == null || value.length < 6) {
      return value;
    }

    symbol = (symbol ? symbol : "-");

    let date = value.substr(0, 4) + symbol + value.substr(4, 2);
    if (value.length > 6) {
      date += symbol + value.substr(6, 2);
    }

    return date;
  },

  parseId(value) { return value.replace("a", ''); },

  getGenerateKey() { return new Date().getTime(); },

  getUuid(max = 4) { 
    const str = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, max);
    return `${str.toUpperCase()}${new Date().getTime()}`;
  },

  isEmpty(value) {
    if (!value || value.length < 1) {
      // if (value == null || value == null || value === 'undefined' || value === "" || value.length < 1) {
      return true;
    }

    return false;
  },

  isEmptyJson(value) { return value == null || value == null ? true : false; },

  getDateTime(dayTag = "", timeTag = "", space = "") { return this.getCurrentDateTime(dayTag, timeTag, space); },

  getCurrentDateTime(dayTag = "", timeTag = "", space = "", date = new Date()) {
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var datetime = year + dayTag + month + dayTag + day + space + hour + timeTag + min + timeTag + sec;

    return datetime;
  },

  getPrevDate(tag, beforeDay) {
    var date = new Date();

    var temp = beforeDay * 1000 * 60 * 60 * 24;
    var time = date.getTime();
    date.setTime(time - temp);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var datetime = year + tag + month + tag + day;

    return datetime;
  },

  getCurrentDate(tag, date = new Date()) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    if (tag == null) {
      return String(year) + String(month) + String(day);
    } else {
      return year + tag + month + tag + day;
    }
  },

  getCurrentTime(tag, type, date = new Date()) {
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    if (type === 'H')
      return hour;
    else if (type === 'M')
      return hour + tag + min;
    else
      return hour + tag + min + tag + sec;
  },

  // string 타입 8자리의 start ~ end날에 대한 차이 날수를 반환한다.
  getDiffDay(start, end) {
    if (this.isEmpty(start) || this.isEmpty(end)) {
      return 0;
    }

    var sday = this.valueOfDate(start);
    var eday = this.valueOfDate(end);

    var diff = eday.getTime() - sday.getTime();
    diff = diff / this.ONE_DAY;

    return diff;
  },

  // string 타입의 8자리 날자와 next 날수를 입력받아 start 날자부터 next 날자를 더하여 8자리 날자 년월일을 반환한다.
  getNextDay(start, next, symbol) {
    var sday = this.valueOfDate(start);
    var eday = sday.getTime() + (next * this.ONE_DAY);
    eday = this.toStringDay(new Date(eday), symbol);
    return eday;
  },

  // Date 타입의 start 날자로부터 next(일수)까지의 날자를 계산하여 년월일중 날자(day)만 반환한다.
  getDay(start, next) { return this.getTimestamp(start, next).getDate(); },

  // Date 타입의 start 날자로부터 next(일수)까지의 날자를 계산한 Date(Timestamp) 타입을 반환한다.
  getTimestamp(start, next) { return new Date(start.getTime() + (next * this.ONE_DAY)); },

  // date 타입의 날자로 전달된 날자에 대한 요일의 순번(일:0 ~ 토:6)을 반환한다.
  getNumOfWeek(date) { return date.getDay(); },

  // date 타입의 날자로 전달된 날자에 대한 요일을 반환한다.
  getWeek(date) {
    var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var weekName = week[date.getDay()];
    //console.log("%s요일 입니다.", weekName);
    return weekName;
  },

  // 8자리 또는 (-)가 붙은 10자리 년월일 을 Date 타입으로 변환한다.
  valueOfDate(value) {
    if (value.indexOf("-") < 0 && value.length === 8) {
      value = value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2);
    }

    return new Date(value);
  },

  fromCharAlphabet(index) { return String.fromCharCode(65 + index); },

  // Date 타입으로 넘겨진 년월일을 symbol과 함께 String 타입의 년월일로 변환한다.
  toStringDay(today, symbol = '') {
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = today.getDate();
    day = (day < 10 ? "0" : "") + day;

    var str_date = year + month + day;

    if (symbol != null) {
      str_date = year + symbol + month + symbol + day;
    }

    return str_date;
  },

  // 8자리 년월일에 파라미터로 넘겨진 symbol을 붙여 년-월-일 형식으로 변환한다.
  toStringSymbol(value, date_symbol = '.', time_symbol = ':', sep = ' ') {
    if (this.isEmpty(value)) {
      return '';
    }

    value = Number.isInteger(value) ? String(value) : value
    var temp = value;
    //시분초
    if (temp.length === 6) {
      temp = value.substr(0, 2) + time_symbol + value.substr(2, 2) + time_symbol + value.substr(4, 2);
      // return;
    }

    //년월일
    if (value.length >= 8) {
      temp = value.substr(0, 4) + date_symbol + value.substr(4, 2) + date_symbol + value.substr(6, 2);
    }

    //시
    if (value.length >= 10) {
      temp += sep + value.substr(8, 2);
    }

    //분
    if (value.length >= 12) {
      temp += time_symbol + value.substr(10, 2);
    }

    //초
    if (value.length >= 14) {
      temp += time_symbol + value.substr(12, 2);
    }

    return temp;
  },

  toShort(value, limit) { return (value.length > limit) ? value.substr(0, limit) + "..." : value; },

  toValue(value) { return value != null ? value : "" },

  // 화면상의 포이터 위치를 가져온다.
  GetAbsPosition(object) {
    var position = {};
    position.x = 0;
    position.y = 0;

    if (object) {
      position.x = object.offsetLeft;
      position.y = object.offsetTop;

      if (object.offsetParent) {
        var parentpos = this.GetAbsPosition(object.offsetParent);
        position.x += parentpos.x;
        position.y += parentpos.y;
      }
    }

    position.cx = object.offsetWidth;
    position.cy = object.offsetHeight;

    return position;
  },

  getPlusMinus(a = 0, b = 0) { return a === b ? '' : a < b ? EID.MINUS : EID.PLUS; },

  toStringPhone(number = '') {
    const value = number;
    if (value.length < 3) {
      return value;
    }

    let prefix = value.substr(0, 2);  // 일단 서울번호부터
    let body, suffix, index = value.length - 4;
    if (prefix !== '02') {
      prefix = value.substr(0, 3);
    }

    suffix = value.substr(index, 4);
    body = value.substr(prefix.length, index - 3);

    return `${prefix}-${body}-${suffix}`;
  },

  // openModal(name, query) { return ({ [name]: {'show': true, 'action': query} }) },

  // closeModal(name, loading=null, ...props) {
  //     return (loading===null || !loading) ? ({ [name]: {'show': false}, ...props }) : ({ [name]: {'show': false}, 'loading': {'show': true}, ...props})
  // },

  showAlert(props, code, align = 'right') {
    if (code !== CODE.SUCCESS) {
      this.showFailAlert(props, align);
      return true;
    } else {
      this.showSuccessAlert(props, align);
      return false;
    }
  },

  showFailAlert(props, align) {
    props.showAlert({ msg: ST.NOTI.FAILUER, type: 'err', align });
    return false;
  },

  showSuccessAlert(props, align) {
    props.showAlert({ msg: ST.NOTI.SUCCESS, type: 'info', align });
    return true;
  },

  getJsonKeys(json) { return Object.keys(json) },
  getJsonValues(json) { return Object.value(json) },
  getJson(json, key) {
    if (json == null || this.isEmpty(json)) {
      return '';
    } else if (this.isJson(json)) {
      const data = JSON.parse(json)[key];
      return data ? data : null;
    } else {
      return json[key];
      // return JSON.parse(json)[key];
    }
  },

  getImage(url, path, type = null) {
    if (url.indexOf("http") === 0) {
      return url;
    }

    return (type === "youtube" || type === "link") ? url : (url.indexOf("data:") === 0 ? url : url ? path + url : '');
  },

  isJson(item) {
    item = (typeof item !== "string") ? JSON.stringify(item) : item;
    try { item = JSON.parse(item); } catch (e) { return false; }
    return (typeof item === "object" && item !== null) ? true : false;
  },

  parseJson(value, deep = true) {
    if (!this.isEmpty(value)) {
      value = value.replace(/\n/gi, '\\n');
      value = value.replace(/\r/gi, '\\r');
      value = value.replace(/\t/gi, '\\t');
      // value = value.replace(/\\"/gi, '\\"');
      let temps = JSON.parse(value);
      if (deep && temps.length > 0) {
        temps.map(item =>
          Object.keys(item).map(key =>
            item[key] = item[key].toString()
              .replace(/\\n/gi, '\n')
              .replace(/\\r/gi, '\r')
              .replace(/\[%#02\]/gi, '"')
          )
        )
      }
      return temps;
    } else {
      return value;
    }
  },

  toJson(value) {
    if (!value) {
      return value;
    } else {
      value = value.replace(/"/gi, '&dqm');
      return value;
    }
  },

  fromJson(value) {
    if (!value) {
      return value;
    } else {
      value = value.replace(/&dqm/gi, '"');
      return value;
    }
  },

  makeComboList(func, list, option = { name: 'title', id: "rowid", selected: 0 }) {
    // 리스트를 생성하고
    const temps = list.map(item => ({ name: item[option.name], id: item[option.id], check: item.check ? item.check : false }));
    const arrays = func != null ? func(temps) : temps;
    option.selected && arrays.map(item => (item.check = (item.id === option.selected)));
    if (arrays.filter(item => item.check === true).length <= 0) arrays[0].check = true;

    return arrays;
  },

  isNumeric(data) {
    return !isNaN(Number(data));
  },

  isSelfClick(e, func) {
    if (e.path) {
      const a = e.path.find(item => {
        const temp = item.className ? item.className.toString() : "";
        return func(temp);
      });

      return a ? true : false;
    } else {
      return false;
    }
  },

  isEmail(asValue) {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴	
  },

  isPhone(asValue) {
    const regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  },

  isPassword(asValue, min = 8, max = 12) {
    if (asValue.length < min || asValue.length > max) return false;

    const regExp = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; //  8 ~ 10자 영문, 숫자 조합
    const is = regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    return is;
  },
};

export const Storage = {
  key: {
    userinfo: 'user-info',
  },

  isJson(item) {
    item = (typeof item !== "string") ? JSON.stringify(item) : item;
    try { item = JSON.parse(item); } catch (e) { return false; }
    return (typeof item === "object" && item !== null) ? true : false;
  },

  setItem(stroage, key, value) {
    this.isJson(value) ? stroage.setItem(key, JSON.stringify(value)) : stroage.setItem(key, value);
  },

  getItem(stroage, key) {
    const value = stroage.getItem(key);
    if (value === undefined || value == null) {
      return null;
    }

    const isjson = this.isJson(value);
    return (isjson) ? JSON.parse(value) : value;
  },

  setSessionItem(key, value) {
    this.setItem(window.sessionStorage, key, value);
  },

  getSessionItem(key) {
    return this.getItem(window.sessionStorage, key);
  },

  removeSessionItem(key) {
    window.sessionStorage.removeItem(key);
  },

  clearSession() {
    window.sessionStorage.clear();
  },

  setLocalItem(key, value) {
    this.setItem(window.localStorage, key, value);
  },

  getLocalItem(key) {
    return this.getItem(window.localStorage, key);
  },

  removeLocalItem(key) {
    window.localStorage.removeItem(key);
  },

  getUser() {
    return this.getLocalItem(this.key.userinfo);
  },

  getToken() {
    const user = this.getLocalItem(this.key.userinfo);
    return user ? user.token : '';
  },

  logout() {
    window.localStorage.removeItem(this.key.userinfo);
  },

  clearLocal() {
    window.localStorage.clear();
  },

  clearAll() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
}