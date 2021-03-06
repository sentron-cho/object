
const color = {
  box: '#f5f5f5f5',
  frame: '#f0f0f0',
  hover: '#e2f1ff',
  active: '#e2f1ff',
  white: '#ffffff',
  alpha: '#ffffff10',
  lightwhite: '#ecf0f2',
  darkwhite: '#eaeaea',
  trans: 'transparent',
  sky: '#f1f8ff',
  primary: '#1a9be4',
  lightprimary: '#8ec3ff',
  primaryhover: '#0f55d6',
  lightyellow: '#fff5c1',
  yellow: '#fff252',
  orange: '#ff692d',
  lightorange: '#ffbe6e',
  orangehover: '#da3e00',
  red: '#ed6464',
  lightred: '#ffa8a8',
  redhover: '#9a1919',
  blue: '#0058b7',
  green: '#00c73c',
  lightgreen: '#c6ffc8',
  greenhover: '#006b20',
  black: '#000000',
  dark: '#353535',
  darkhover: '#636363',
  lightblack: '#303030',
  semiblack: '#505050',
  alphablack: '#202020a0',
  gray: '#a0a0a0',
  grayhover: '#a0a0a0',
  darkgray: '#909090',
  lightgray: '#dedede',
  alphagray: '#a0a0a090',
  disable: '#5d5d5dbd',
  up: '#b30202',
  down: '#2b49c1',
  plus: '#b30202',
  minus: '#2b49c1',
  select: '#f6f8fa',
  back: '#202020a0',
};

const cs = {
  color: { ...color },

  themecolor: (theme) => (theme === 'dark-theme' ? color.lightwhite : color.black),

  float: {
    r: 'float: right;',
    l: 'float: left;',
    right: 'float: right;',
    left: 'float: left;',
    none: 'float: none;',

    get: (v) => `float: ${v};`,
  },

  min: {
    wxl: 'min-width: 1280px;',
    wlg: 'min-width: 1024px;',
    wmd: 'min-width: 800px;',
    wsm: 'min-width: 600px;',

    width: (v) => Number.isInteger(v) ? `min-width: ${v}px;` : `min-width: ${v};`,
    height: (v) => Number.isInteger(v) ? `min-height: ${v}px;` : `min-height: ${v};`,

    w: (v) => Number.isInteger(v) ? `min-width: ${v}px;` : `min-width: ${v};`,
    h: (v) => Number.isInteger(v) ? `min-height: ${v}px;` : `min-height: ${v};`,
  },

  group: (v = 5) =>
    Number.isInteger(v) ?
      `& > *:not(:last-child) { border-radius: 0; border-right: 0; } & > :last-child { border-radius: 0 ${v}px ${v}px 0; }; & > :first-child { border-radius: ${v}px 0 0 ${v}px; } ` :
      `& > *:not(:last-child) { border-radius: 0; border-right: 0; } & > :last-child { border-radius: 0 ${v} ${v} 0; }; & > :first-child { border-radius: ${v} 0 0 ${v}; } `,

  selection: (v = color.lightgray, r = '5px') => `cursor: pointer; border: 1px solid ${v}; border-radius: ${Number.isInteger(r) ? r + 'px' : r}; `
    + `&:hover { box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-color: transparent; };`,

  max: {
    full: 'max-width: 100%;',
    none: 'max-width: none;',
    wxl: 'max-width: 1280px;',
    wlg: 'max-width: 1024px;',
    wmd: 'max-width: 800px;',
    wsm: 'max-width: 600px;',

    width: (v) => Number.isInteger(v) ? `max-width: ${v}px;` : `max-width: ${v};`,
    height: (v) => Number.isInteger(v) ? `max-height: ${v}px;` : `max-height: ${v};`,

    w: (v) => Number.isInteger(v) ? `max-width: ${v}px;` : `max-width: ${v};`,
    h: (v) => Number.isInteger(v) ? `max-height: ${v}px;` : `max-height: ${v};`,
  },

  right: (v) => Number.isInteger(v) ? `left: unset; right: ${v}px;` : `left: unset; right: ${v};`,
  left: (v) => Number.isInteger(v) ? `right: unset; left: ${v}px;` : `right: unset; left: ${v};`,
  top: (v) => Number.isInteger(v) ? `bottom:unset; top: ${v}px;` : `bottom:unset; top: ${v};`,
  bottom: (v) => Number.isInteger(v) ? `top: unset; bottom: ${v}px;` : `top: unset; bottom: ${v};`,

  textselect: 'user-select: text;',
  noselect: 'user-select: none;',
  noliststyle: 'ul, li, ol, p {list-style: none; margin: 0; padding: 0;}',
  nolist: 'list-style: none; margin: 0; padding: 0;',
  zoom: (v = 1) => `zoom: ${v};`,

  content: {
    none: 'content: "";',

    attr: (v) => `content: attr(${v});`,
    get: (v) => `content: ${v};`,
  },

  pos: {
    absolute: 'position: absolute;',
    relative: 'position: relative;',
    fixed: 'position: fixed;',
    sticky: 'position: sticky;',

    ltop: 'bottom: unset; right: unset; left: 0; top: 0;',
    rtop: 'bottom: unset; left: unset; right: 0; top: 0;',
    lbottom: 'top: unset; right: unset; left: 0; bottom: 0;',
    rbottom: 'top: unset; left: unset; right: 0; bottom: 0;',
    unset: 'top: unset; bottom: unset; left: unset; right: unset; transform: none;',

    get: (v) => `position: ${v};`,
  },

  pointer: {
    eventnone: 'pointer-events: none;',
  },

  mouse: {
    pointer: 'cursor: pointer;',
    default: 'cursor: default;',
    cross: 'cursor: crosshair;',
    move: 'cursor: move;',
    text: 'cursor: text;',
    alias: 'cursor: alias;',

    get: (v) => `cursor: ${v};`,
  },

  disp: {
    hide: 'display: none;',
    none: 'display: none;',
    block: 'display: block;',
    inblock: 'display: inline-block;',
    inline: 'display: inline;',
    autoflex: 'display: flex;',
    contents: 'display: contents;',
    table: 'display: table;',
    tcell: 'display: table-cell;',

    visible: 'visibility: visible;',
    invisible: 'visibility: hidden;',
    hidden: 'visibility: hidden;',

    popup: (v = 999999, bg = 'transparent', w = 800, h = 600) => `z-index: ${v}; width: 100%; 
      height: 100%; display: block; position: fixed; bottom: unset; top: 0; left: 0;
      .pop-bg { background: ${bg}; width: 100%; height: 100%; display: block; }
      .pop-box { z-index: ${v};
        width: 100%; height: 100%; display: block; max-width: ${w}px; max-height: ${h}px; 
        ${cs.box.line} ${cs.radius.all(2)} ${cs.align.center} ${cs.bg.white} ${cs.over.hidden} 
        .head {
          ${cs.h.get(60)} ${cs.border.bottom} ${cs.font.t0} ${cs.font.line(60)} ${cs.border.primary} ${cs.bg.sky}
        }
        .body { ${cs.h.calc('100% - 60px')} ${cs.font.sm} }
      }
      @media screen and (max-width : 1024px) { }
  
      @media screen and (max-width : 800px) { 
        .pop-box { ${cs.align.unset} ${cs.align.top} ${cs.left(0)} ${cs.h.full} ${cs.max.h('none')} 
          .head { ${cs.p.h10} }
          .body { ${cs.p.a10} ${cs.h.full} ${cs.over.hidden} ${cs.over.yauto} ${cs.scrollbar.t2} 
            ${cs.p.bottom(100)} ${cs.p.top(30)}
          }
        }
      }
    
      @media screen and (max-width : 480px) { }

      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .pop-bg { ${cs.bg.dark} ${cs.opac.get(0.5)} }
      }
    `,
    flex: (v) => `flex: ${v};`,
    get: (v) => `display: ${v};`,
    flexgrow: (v = 1, s = 'column') => `display: flex; flex-grow: ${v}; flex-direction: ${s}; `,
    flexwrap: (v = 'row', s = 'wrap') => `display: flex; flex-flow: ${v}; flex-wrap: ${s};`,
  },

  object: {
    contain: 'object-fit: contain;',
    scaledown: 'object-fit: scale-down;',
    cover: 'object-fit: cover;',
    fill: 'object-fit: fill;',
    center: 'object-position: center center;',

    shadow: (v) => v ? v : `box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`,
    fit: (v) => `object-fit: ${v};`,
    position: (v) => `object-position: ${v};`
  },

  over: {
    hidden: 'overflow: hidden;',
    xhidden: 'overflow-x: hidden;',
    yhidden: 'overflow-y: hidden;',
    auto: 'overflow: auto;',
    xauto: 'overflow: hidden; overflow-x: auto;',
    yauto: 'overflow: hidden; overflow-y: auto;',
    visible: 'overflow: scroll;',
    xvisible: 'overflow: hidden; overflow-x: scroll;',
    yvisible: 'overflow: hidden; overflow-y: scroll;',
    unset: 'overflow: unset;',
    inherit: 'overflow: inherit;',

    get: (v) => `overflow: ${v};`,
  },

  size: {
    full: 'width: 100%; height: 100%;',
    auto: 'width: auto; height: auto;',
    wauto: 'height: 100%; width: auto;',
    hauto: 'width: 100%; height: auto;',
    fit: 'width: fit-content; height: fit-content;',
    wfit: 'height: 100%; width: fit-content;',
    hfit: 'width: 100%; height: fit-content;',
    max: 'width: max-content; height: max-content;',
    wmax: 'height: 100%; width: max-content;',
    hmax: 'width: 100%; height: max-content;',
    min: 'width: min-content; height: min-content;',
    wmin: 'height: 100%; width: min-content;',
    hmin: 'width: 100%; height: min-content;',

    normal: (w = 320) => `width: ${w}px;; height ${(w / 4) * 3}px;`,  // 4:3
    wide: (w = 320) => `width: ${w}px;; height ${(w / 16) * 9}px;`,  // 16:9
    xwide: (w = 320) => `width: ${w}px;; height ${(w / 21) * 9}px;`,  // 21:9
    fwide: (w = 320) => `width: ${w}px;; height ${(w / 28) * 9}px;`,  // 28:9

    get: (v) => Number.isInteger(v) ? `width: ${v}px; height: ${v}px;` : `width: ${v}; height: ${v};`,
  },

  resize: {
    none: 'resize: none;',
    vertical: 'resize: vertical;',
    horizontal: 'resize: horizontal;',

    get: (v) => `resize: ${v};`,
  },

  h: {
    xl: 'height: 48px;',
    lg: 'height: 38px;',
    md: 'height: 34px;',
    sm: 'height: 28px;',
    xs: 'height: 20px;',
    full: 'height: 100%;',
    half: 'height: 50%;',
    r50: 'height: 50%;',
    r33: 'height: 33.333%;',
    r25: 'height: 25%;',
    r20: 'height: 20%;',
    r10: 'height: 10%;',
    auto: 'height: auto;',
    fit: 'height: fit-content;',
    min: 'height: min-content;',
    max: 'height: max-content;',
    dsxl: 'height: 1200px;',
    dslg: 'height: 800px;',
    dsmd: 'height: 640px;',
    dssm: 'height: 420px;',
    dsxs: 'height: 320px;',
    none: 'height: 0;',

    calc: (v) => Number.isInteger(v) ? `height: calc(${v}px);` : `height: calc(${v});`,
    get: (v) => Number.isInteger(v) ? `height: ${v}px;` : `height: ${v};`,
  },

  w: {
    xl: 'width: 48px;',
    lg: 'width: 38px;',
    md: 'width: 34px;',
    sm: 'width: 28px;',
    xs: 'width: 20px;',
    full: 'width: 100%;',
    half: 'width: 50%;',
    r50: 'width: 50%;',
    r33: 'width: 33.333%;',
    r25: 'width: 25%;',
    r20: 'width: 20%;',
    r10: 'width: 10%;',
    auto: 'width: auto;',
    fit: 'width: fit-content;',
    min: 'width: min-content;',
    max: 'width: max-content;',
    dsxl: 'width: 1280px;',
    dslg: 'width: 800px;',
    dsmd: 'width: 640px;',
    dssm: 'width: 480px;',
    dsxs: 'width: 320px;',
    none: 'width: 0;',

    calc: (v) => Number.isInteger(v) ? `width: calc(${v}px);` : `width: calc(${v});`,
    get: (v) => Number.isInteger(v) ? `width: ${v}px;` : `width: ${v};`,
  },

  z: {
    back: 'z-index: 0;',
    front: 'z-index: 1;',
    icon: 'z-index: 9;',
    over: 'z-index: 99;',
    thead: 'z-index: 19999;',
    menu: 'z-index: 99999;',
    sidebar: 'z-index: 199998;',
    header: 'z-index: 199999;',
    popup: 'z-index: 999999;',
    modal: 'z-index: 1999999;',
    confirm: 'z-index: 2999999;',
    top: 'z-index: 9999999;',

    get: (v) => `z-index: ${v};`,
  },

  font: {
    xs: 'font-size: 10px;',
    sm: 'font-size: 12px;',
    md: 'font-size: 14px;',
    lg: 'font-size: 16px;',
    xl: 'font-size: 18px;',
    xxl: 'font-size: 20px;',
    t0: 'font-size: 22px; font-weight: 550;',
    t1: 'font-size: 28px; font-weight: 550;',
    t2: 'font-size: 34px; font-weight: 550;',
    t3: 'font-size: 40px; font-weight: 550;',
    t4: 'font-size: 48px; font-weight: 600;',
    t5: 'font-size: 54px; font-weight: 700;',
    left: 'text-align: left;',
    center: 'text-align: center;',
    right: 'text-align: right;',
    thin: 'font-weight: 300;',
    thinbold: 'font-weight: 400;',
    semibold: 'font-weight: 500;',
    bold: 'font-weight: 550;',
    thickbold: 'font-weight: 600;',
    white: `color: ${color.white};`,
    lightwhite: `color: ${color.lightwhite};`,
    gray: `color: ${color.gray};`,
    trans: `color: ${color.trans};`,
    primary: `color: ${color.primary};`,
    primaryhover: `color: ${color.primaryhover};`,
    lightprimary: `color: ${color.lightprimary};`,
    blue: `color: ${color.blue};`,
    yellow: `color: ${color.yellow};`,
    orange: `color: ${color.orange};`,
    orangehover: `color: ${color.orangehover};`,
    red: `color: ${color.red};`,
    redhover: `color: ${color.redhover};`,
    green: `color: ${color.green};`,
    black: `color: ${color.black};`,
    dark: `color: ${color.dark};`,
    lightblack: `color: ${color.lightblack};`,
    alphablack: `color: ${color.alphablack};`,
    darkgray: `color: ${color.darkgray};`,
    lightgray: `color: ${color.lightgray};`,
    minus: `color: ${color.minus};`,
    plus: `color: ${color.plus};`,
    preline: 'white-space: pre-line; word-break: break-all;',
    prewrap: 'white-space: pre-wrap; word-break: break-all;',
    underline: 'text-decoration: underline;',
    cancelline: 'text-decoration: line-through;',
    noneline: 'text-decoration: none;',
    upper: 'text-transform: uppercase;',
    lower: 'text-transform: lowercase;',
    ellipsis: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;',
    breakall: 'word-break: break-all;',
    breakword: 'word-break: break-word;',
    keepall: 'word-break: keep-all;',
    payton: 'font-family: "Paytone One";',
    eastsea: 'font-family: "East Sea Dokdo";',
    hansans: 'font-family: "Black Han Sans";',
    nanumgothic: 'font-family: "Nanum Gothic";',
    nanumcoding: 'font-family: "Nanum Gothic Coding";',
    natosans: 'font-family: "Noto Sans";',
    himelody: 'font-family: "Hi Melody";',

    outline: (v = '1px', c = 'black') => Number.isInteger(v) ? `-webkit-text-stroke: ${v}px ${c};` : `-webkit-text-stroke: ${v} ${c};`,
    overflow: (v) => `text-overflow: ${v};`,
    space: (v) => `white-space: ${v};`,
    family: (v) => `font-family: ${v};`,
    style: (v) => `font-family: ${v};`,
    deco: (v) => `text-decoration: ${v};`,
    line: (v) => Number.isInteger(v) ? `line-height: ${v}px;` : `line-height: ${v};`,
    color: (v) => `color: ${v};`,
    size: (v) => Number.isInteger(v) ? `font-size: ${v}px;` : `font-size: ${v};`,
    get: (v) => Number.isInteger(v) ? `font-size: ${v}px;` : `font: ${v};`,
    weight: (v) => `font-weight: ${v};`,
    align: (v) => `text-align: ${v};`,
    break: (v = 'break-all') => `word-break: ${v};`,
    spacing: (v = 0) => Number.isInteger(v) ? `letter-spacing: ${v}px;` : `letter-spacing: ${v};`,
    stretch: (v = 'normal') => `font-stretch: ${v};`,
    shadow: (v = '#ffffffff', p = '1px 1px 1px') => `text-shadow: ${p} ${v};`
  },

  opac: {
    invisible: 'opacity: 0;',
    hide: 'opacity: 0.1;',
    alpha: 'opacity: 0.5;',
    show: 'opacity: 0.9;',
    visible: 'opacity: 1;',

    get: (v) => `opacity: ${v};`,
  },

  anim: {
    hide: 'transition: all 200ms ease-out;',
    show: 'transition: all 200ms ease-in;',
    repeat: 'animation-iteration-count: infinite;',
    bounding: 'animation-timing-function: cubic-bezier(0, 0, 0.4, 1.5);',
    quadratic: 'animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);',

    in: (v = '150ms') => Number.isInteger(v) ? `transition: all ${v}ms ease-in;` : `transition: all ${v} ease-in;`,
    out: (v = '150ms') => Number.isInteger(v) ? `transition: all ${v}ms ease-out;` : `transition: all ${v} ease-out;`,
    get: (v) => `transition: ${v};`,
    iteration: (v) => `animation-iteration-count: ${v};`,
    timing: (v) => `animation-timing-function: ${v};`,
    delay: (v = '300ms') => `animation-delay: ${v};`,
    origin: (v = 'center') => `transform-origin: ${v};`,

    name: (v = '150ms') => `animation-name: ${v};`,
    time: (v = '150ms') => Number.isInteger(v) ? `animation-duration: ${v}ms;` : `animation-duration: ${v};`,
    showin: (v = '150ms', s = '0', e = '1', name = 'showin', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from { opacity: ${s};  } to { opacity: ${e}; } };`,
    showout: (v = '150ms', s = '1', e = '0', name = 'showout', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from { opacity: ${s};  } to { opacity: ${e}; } };`,
    fadein: (v = '150ms', s = '0', e = '1', name = 'fadein', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from { opacity: ${s}; } to { opacity: ${e}; } };`,
    fadeout: (v = '150ms', s = '1', e = '0', name = 'fadeout', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from { opacity: ${s}; } to { opacity: ${e}; } };`,
    slidein: (v = '150ms', s = '-100%', e = '0', name = 'slidein', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes  ${name} { from  { transform: translateX(${s}); opacity: 0.3; } to { transform: translateX(${e}); opacity: 1; } };`,
    slideout: (v = '150ms', s = '0', e = '-100%', name = 'slideout', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from  { transform: translateX(${s});  opacity: 0.3; } to { transform: translateX(${e});  opacity: 1; } };`,
    slidedown: (v = '150ms', s = '-100%', e = '0', name = 'slidedown', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from  { transform: translateY(${s}); opacity: 0.3; } to { transform: translateY(${e}); opacity: 1; } };`,
    slideup: (v = '150ms', s = '0', e = '-100%', name = 'slideup', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from  { transform: translateY(${s});  opacity: 0.3; } to { transform: translateY(${e});  opacity: 1; } };`,
    sizing: (v = '150ms', s = '40px', e = '100px', name = 'sizing', type = 'linear') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from  { height: ${s}; opacity: 0.3; } to { height: ${e};  opacity: 1; } };`,
    zoomin: (v = '300ms', s = '1.0', e = '1.2', opac = 1.0, name = 'zoomin', type = 'ease-out') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from { transform: scale(${s}); } to { transform: scale(${e}); opacity: ${opac}; } };`,
    zoomout: (v = '150ms', s = '0', e = '1', name = 'zoomout', type = 'ease-in') => {
      return `animation: ${name} ${type} 1 forwards ${v}; 
      @keyframes ${name} { 
        0% { transform: scaleX(${s}); opacity: 0; }
        100% { transform: scaleX(${e}); opacity: 1;  }
    };`},
    zoomup: (v = '150ms', s = '0', e = '1', name = 'zoomup', type = 'ease-in') => {
      return `animation: ${name} ${type} 1 forwards ${v}; 
      @keyframes ${name} { 
        0% { transform: scaleY(${s}); opacity: 0; }
        100% { transform: scaleY(${e}); opacity: 1;  }
    };`},
    flicking: (v = '150ms', s = '1', e = '0', r = 1, name = 'filking', type = 'linear') => `animation: ${name} ${type} ${r} forwards ${v}; @keyframes ${name} { 0% { opacity: ${s}; } 50% { opacity: ${e}; } 100% { opacity: ${s}; } };`,
    slide: (v = '150ms', s = '0', e = '-100%', name = 'slide', type = 'ease-in') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { from  { transform: translateY(${s});  } to { transform: translateY(${e}); } };`,
    rotate: (v = '150ms', s = '0', e = '360deg', name = 'rotate', type = 'ease-in') => `animation: ${name} ${type} 1 forwards ${v}; @keyframes ${name} { 0% { transform: rotate(${s}) } 100% { transform: rotate(${e}) } };`,
    foldin: (v = '150ms', s = '0', e = '100%', name = 'foldin', type = 'ease-in') => {
      return `animation: ${name} ${type} 1 forwards ${v}; overflow: hidden;
      @keyframes ${name} { 
        0% { width: ${s}; opacity: 1; }
        100% { width: ${e}; opacity: 1; }
      };`
    },
    foldup: (v = '150ms', s = '0', e = '100%', name = 'foldin', type = 'ease-in') => {
      return `animation: ${name} ${type} 1 forwards ${v}; overflow: hidden;
      @keyframes ${name} { 
        0% { height: ${s}; opacity: 1; }
        100% { height: ${e}; opacity: 1; }
      };`
    },
    rotatezoom: (v = '150ms', s = '0', e = '360deg', name = 'rotatezoom', type = 'ease-in') => {
      return `animation: ${name} ${type} 1 forwards ${v}; transform-origin: center;
      @keyframes ${name} { 
        0% { transform: rotate(${s}) scale(0.2); opacity: 0.1; }
        70% { transform: rotate(${e}) scale(1.0); opacity: 0.5; transform-origin: center; }
        100% { transform: rotate(${e}) scale(1.0); opacity: 1; }
      };`
    },
  },

  align: {
    unset: 'top: unset; bottom: unset; left: unset; right: unset; transform: none;',
    top: 'position: absolute; bottom: unset; top: 0;',
    bottom: 'position: absolute; top: unset; bottom: 0;',
    left: 'position: absolute; right: unset; left: 0;',
    right: 'position: absolute; left: unset; right: 0;',

    center: 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);',

    ycenter: 'position: absolute; top: 50%; transform: translateY(-50%);',
    xcenter: 'position: absolute; left: 50%; transform: translateX(-50%);',
    ltop: 'position: absolute; left: 5px; top: 5px;',
    rtop: 'position: absolute; right: 5px; top: 5px;',
    lbottom: 'position: absolute; left: 5px; bottom: 5px;',
    rbottom: 'position: absolute; right: 5px; bottom: 5px;',
    ctop: 'position: absolute; left: 50%; top: 5px; transform: translateX(-50%);',
    cbottom: 'position: absolute; left: 50%; bottom: 5px; transform: translateX(-50%);',

    x: (v) => Number.isInteger(v) ? `transform: translateX(${v}px);` : `transform: translateX(${v});`,
    y: (v) => Number.isInteger(v) ? `transform: translateY(${v}px);;` : `transform: translateY(${v});`,
    vertical: (v) => `vertical-align : ${v};`,
    get: (v) => `transform: ${v};`,
    translate: (v) => `transform: translate(${v});`,
    justify: (v) => `justify-content: ${v};`,
  },

  transform: {
    none: 'transform: none;',
    translateX: (v) => `transform: translateX(${v});`,
    translateY: (v) => `transform: translateY(${v});`,
    translate: (v) => `transform: translate(${v});`,
    rotate: (v) => `transform: rotate(${v});`,
    get: (v) => `transform: ${v};`,
  },

  bg: {
    box: `background: ${color.box};`,
    frame: `background: ${color.frame};`,
    active: `background: ${color.active};`,
    hover: `background: ${color.hover};`,
    white: `background: ${color.white};`,
    lightwhite: `background: ${color.lightwhite};`,
    darkwhite: `background: ${color.darkwhite};`,
    gray: `background: ${color.gray};`,
    grayhover: `background: ${color.grayhover};`,
    trans: `background: ${color.trans};`,
    sky: `background: ${color.sky};`,
    primary: `background: ${color.primary};`,
    lightprimary: `background: ${color.lightprimary};`,
    primaryhover: `background: ${color.primaryhover};`,
    blue: `background: ${color.blue};`,
    lightyellow: `background: ${color.lightyellow};`,
    yellow: `background: ${color.yellow};`,
    orange: `background: ${color.orange};`,
    lightorange: `background: ${color.lightorange};`,
    orangehover: `background: ${color.orangehover};`,
    red: `background: ${color.red};`,
    lightred: `background: ${color.lightred};`,
    redhover: `background: ${color.redhover};`,
    green: `background: ${color.green};`,
    lightgreen: `background: ${color.lightgreen};`,
    greenhover: `background: ${color.greenhover};`,
    black: `background: ${color.black};`,
    dark: `background: ${color.dark};`,
    darkhover: `background: ${color.darkhover};`,
    lightblack: `background: ${color.lightblack};`,
    alphablack: `background: ${color.alphablack};`,
    darkgray: `background: ${color.darkgray};`,
    lightgray: `background: ${color.lightgray};`,
    alphagray: `background: ${color.alphagray};`,
    disable: `background: ${color.disable};`,
    select: `background: ${color.select};`,
    back: `background: ${color.back};`,
    vgradint: 'background: linear-gradient(45deg,#f1f8ff33,#c8e1ffa0);',
    hgradint: 'background: linear-gradient(180deg,#e8f1ffa0,#a7cfffa0,#147effa0);',

    color: (v) => `background: ${v};`,
    get: (v) => `background: ${v};`,
    size: (v) => `background-size: ${v};`,
    repeat: (v) => `background-repeat: ${v};`,
    pos: (v) => `background-position: ${v};`,
    image: (v) => `background-image: url(${v});`,
    attach: (v) => `background-attachment: ${v};`
  },

  icon: {
    xxl: 'width: 50px; height: 50px;',
    xl: 'width: 42px; height: 42px;',
    lg: 'width: 34px; height: 34px;',
    md: 'width: 26px; height: 26px;',
    sm: 'width: 18px; height: 18px;',
    xs: 'width: 14px; height: 14px;',
    xxs: 'width: 12px; height: 12px;',

    fill: (v) => `fill: ${v};`,
    get: (v) => `width: ${v}px; height: ${v}px;`,
  },

  fill: {
    none: 'fill: none;',
    white: `fill: ${color.white};`,
    lightwhite: `fill: ${color.lightwhite};`,
    darkwhite: `fill: ${color.darkwhite};`,
    gray: `fill: ${color.gray};`,
    grayhover: `fill: ${color.grayhover};`,
    trans: `fill: ${color.trans};`,
    sky: `fill: ${color.sky};`,
    primary: `fill: ${color.primary};`,
    primaryhover: `fill: ${color.primaryhover};`,
    blue: `fill: ${color.blue};`,
    yellow: `fill: ${color.yellow};`,
    orange: `fill: ${color.orange};`,
    orangehover: `fill: ${color.orangehover};`,
    red: `fill: ${color.red};`,
    redhover: `fill: ${color.redhover};`,
    green: `fill: ${color.green};`,
    greenhover: `fill: ${color.greenhover};`,
    black: `fill: ${color.black};`,
    dark: `fill: ${color.dark};`,
    darkhover: `fill: ${color.darkhover};`,
    lightblack: `fill: ${color.lightblack};`,
    alphablack: `fill: ${color.alphablack};`,
    darkgray: `fill: ${color.darkgray};`,
    lightgray: `fill: ${color.lightgray};`,
    alphagray: `fill: ${color.alphagray};`,
    select: `fill: ${color.select};`,
    back: `fill: ${color.back};`,
    vgradint: 'fill: linear-gradient(45deg, #f1f8ff33, #c8e1ffa0);',

    color: (v) => `fill: ${v};`,
    get: (v) => `fill: ${v};`,
  },

  stroke: {
    line: 'stroke-width: 1px;',
    white: `stroke: ${color.white};`,
    lightwhite: `stroke: ${color.lightwhite};`,
    darkwhite: `stroke: ${color.darkwhite};`,
    gray: `stroke: ${color.gray};`,
    trans: `stroke: ${color.trans};`,
    sky: `stroke: ${color.sky};`,
    primary: `stroke: ${color.primary};`,
    blue: `stroke: ${color.blue};`,
    yellow: `stroke: ${color.yellow};`,
    orange: `stroke: ${color.orange};`,
    red: `stroke: ${color.red};`,
    green: `stroke: ${color.green};`,
    black: `stroke: ${color.black};`,
    dark: `stroke: ${color.dark};`,
    lightblack: `stroke: ${color.lightblack};`,
    alphablack: `stroke: ${color.alphablack};`,
    semiblack: `stroke: ${color.semiblack};`,
    darkgray: `stroke: ${color.darkgray};`,
    lightgray: `stroke: ${color.lightgray};`,
    alphagray: `stroke: ${color.alphagray};`,
    select: `stroke: ${color.select};`,
    back: `stroke: ${color.back};`,
    vgradint: 'stroke: linear-gradient(45deg, #f1f8ff33, #c8e1ffa0);',

    color: (v) => `stroke: ${v};`,
    get: (v) => `stroke: ${v};`,
    width: (v) => `stroke-width: ${v};`,
  },

  box: {
    radius: 'border-radius: 5px;',
    round: 'border-radius: 10px;',
    circle: 'border-radius: 100%;',
    line: `border: solid 1px ${color.gray};`,
    doted: `border: doted 1px ${color.gray};`,
    dashed: `border: dashed 1px ${color.gray};`,
    shadow: 'box-shadow: 1px 1px 2px 2px #2121219c;',
    inner: 'box-sizing: border-box;',
    light: `border: solid 1px ${color.lightgray};`,
    dark: `border: solid 1px ${color.dark};`,
    black: `border: solid 1px ${color.black};`,
    primary: `border: solid 1px ${color.primary};`,
    red: `border: solid 1px ${color.red};`,
    green: `border: solid 1px ${color.green};`,
    orange: `border: solid 1px ${color.orange};`,
    sky: `border: solid 1px ${color.sky};`,

    style: (v) => `border-style: ${v};`,
    left: (v) => Number.isInteger(v) ? `border-left: solid ${v}px ${color.lightgray};` : `border-left: ${v};`,
    right: (v) => Number.isInteger(v) ? `border-right: solid ${v}px ${color.lightgray};` : `border-right: ${v};`,
    top: (v) => Number.isInteger(v) ? `border-top: solid ${v}px ${color.lightgray};` : `border-top: ${v};`,
    bottom: (v) => Number.isInteger(v) ? `border-bottom: solid ${v}px ${color.lightgray};` : `border-bottom: ${v};`,
    get: (v) => `border: ${v};`,
    sizing: (v) => `box-sizing: ${v};`,
  },

  border: {
    none: `border: solid 0px ${color.trans};`,
    line: `border: solid 1px ${color.lightgray};`,
    left: `border-left: solid 1px ${color.lightgray};`,
    right: `border-right: solid 1px ${color.lightgray};`,
    top: `border-top: solid 1px ${color.lightgray};`,
    bottom: `border-bottom: solid 1px ${color.lightgray};`,
    white: `border-color: ${color.white};`,
    lightwhite: `border-color: ${color.lightwhite};`,
    darkwhite: `border-color: ${color.darkwhite};`,
    gray: `border-color: ${color.gray};`,
    trans: `border-color: ${color.trans};`,
    primary: `border-color: ${color.primary};`,
    lightprimary: `border-color: ${color.lightprimary};`,
    yellow: `border-color: ${color.yellow};`,
    orange: `border-color: ${color.orange};`,
    blue: `border-color: ${color.blue};`,
    red: `border-color: ${color.red};`,
    green: `border-color: ${color.green};`,
    black: `border-color: ${color.black};`,
    dark: `border-color: ${color.dark};`,
    alphablack: `border-color: ${color.alphablack};`,
    darkgray: `border-color: ${color.darkgray};`,
    lightgray: `border-color: ${color.lightgray};`,
    alphagray: `border-color: ${color.alphagray};`,
    semiblack: `border-color: ${color.semiblack};`,

    topcolor: (v) => `border-top-color: ${v};`,
    bottomcolor: (v) => `border-bottom-color: ${v};`,
    leftcolor: (v) => `border-left-color: ${v};`,
    rightcolor: (v) => `border-right-color: ${v};`,

    shadow: (v = null) => v ? `box-shadow: ${v};` : 'box-shadow: 0 1px 3px 0 rgba(0,0,0,0.6), 0 4px 8px 3px rgba(0,0,0,0.3);',
    color: (v = cs.color.lightgray) => `border-color: ${v};`,
    width: (v = 1) => Number.isInteger(v) ? `border-width: ${v}px;` : `border-width: ${v};`,
    get: (v) => `border: ${v};`,
    radius: (v = 5) => Number.isInteger(v) ? `border-radius: ${v}px;` : `border-radius: ${v};`,
    outline: (v = 1) => `outline: ${v};`,
    set: (v) => `${v};`,
  },

  radius: {
    all: (v) => Number.isInteger(v) ? `border-radius: ${v}px;` : `border-radius: ${v};`,
    right: (v) => Number.isInteger(v) ? `border-radius: 0 ${v}px ${v}px 0;` : `border-radius: 0 ${v} ${v} 0;`,
    left: (v) => Number.isInteger(v) ? `border-radius: ${v}px 0 0 ${v}px;` : `border-radius: ${v} 0 0 ${v};`,
    top: (v) => Number.isInteger(v) ? `border-radius: ${v}px ${v}px 0 0;` : `border-radius: ${v} ${v} 0 0;`,
    bottom: (v) => Number.isInteger(v) ? `border-radius: 0 0 ${v}px ${v}px;` : `border-radius: 0 0 ${v} ${v};`,

    ltop: (v) => Number.isInteger(v) ? `border-radius: ${v}px 0 0 0;` : `border-radius: ${v} 0 0 0;`,
    rtop: (v) => Number.isInteger(v) ? `border-radius: 0 ${v}px 0 0;` : `border-radius: 0 ${v} 0 0;`,
    rbottom: (v) => Number.isInteger(v) ? `border-radius: 0 0 ${v}px 0;` : `border-radius: 0 0 ${v} 0;`,
    lbottom: (v) => Number.isInteger(v) ? `border-radius: 0 0 0 ${v}px;` : `border-radius: 0 0 0 ${v};`,
  },

  m: {
    a0: 'margin: 0;',
    a1: 'margin: 1px;',
    a2: 'margin: 2px;',
    a3: 'margin: 3px;',
    a5: 'margin: 5px;',
    a10: 'margin: 10px;',
    a15: 'margin: 15px;',
    a20: 'margin: 20px;',
    a25: 'margin: 25px;',
    a30: 'margin: 30px;',
    a40: 'margin: 40px;',
    a50: 'margin: 50px;',

    h0: 'margin-left: 0; margin-right: 0;',
    h1: 'margin-left: 1px; margin-right: 1px;',
    h2: 'margin-left: 2px; margin-right: 2px;',
    h3: 'margin-left: 3px; margin-right: 3px;',
    h5: 'margin-left: 5px; margin-right: 5px;',
    h10: 'margin-left: 10px; margin-right: 10px;',
    h15: 'margin-left: 15px; margin-right: 15px;',
    h20: 'margin-left: 20px; margin-right: 20px;',
    h25: 'margin-left: 25px; margin-right: 25px;',
    h30: 'margin-left: 30px; margin-right: 30px;',
    h40: 'margin-left: 40px; margin-right: 40px;',
    h50: 'margin-left: 50px; margin-right: 50px;',

    v0: 'margin-top: 0; margin-bottom: 0;',
    v1: 'margin-top: 1px; margin-bottom: 1px;',
    v2: 'margin-top: 2px; margin-bottom: 2px;',
    v3: 'margin-top: 3px; margin-bottom: 3px;',
    v5: 'margin-top: 5px; margin-bottom: 5px;',
    v10: 'margin-top: 10px; margin-bottom: 10px;',
    v15: 'margin-top: 15px; margin-bottom: 15px;',
    v20: 'margin-top: 20px; margin-bottom: 20px;',
    v25: 'margin-top: 25px; margin-bottom: 25px;',
    v30: 'margin-top: 30px; margin-bottom: 30px;',
    v40: 'margin-top: 40px; margin-bottom: 40px;',
    v50: 'margin-top: 50px; margin-bottom: 50px;',

    t0: 'margin-top: 0;',
    t1: 'margin-top: 1px;',
    t2: 'margin-top: 2px;',
    t3: 'margin-top: 3px;',
    t5: 'margin-top: 5px;',
    t10: 'margin-top: 10px;',
    t15: 'margin-top: 15px;',
    t20: 'margin-top: 20px;',
    t25: 'margin-top: 25px;',
    t30: 'margin-top: 30px;',
    t40: 'margin-top: 40px;',
    t50: 'margin-top: 50px;',

    b0: 'margin-bottom: 0;',
    b1: 'margin-bottom: 1px;',
    b2: 'margin-bottom: 2px;',
    b3: 'margin-bottom: 3px;',
    b5: 'margin-bottom: 5px;',
    b10: 'margin-bottom: 10px;',
    b15: 'margin-bottom: 15px;',
    b20: 'margin-bottom: 20px;',
    b25: 'margin-bottom: 25px;',
    b30: 'margin-bottom: 30px;',
    b40: 'margin-bottom: 40px;',
    b50: 'margin-bottom: 50px;',

    l0: 'margin-left: 0;',
    l1: 'margin-left: 1px;',
    l2: 'margin-left: 2px;',
    l3: 'margin-left: 3px;',
    l5: 'margin-left: 5px;',
    l10: 'margin-left: 10px;',
    l15: 'margin-left: 15px;',
    l20: 'margin-left: 20px;',
    l25: 'margin-left: 25px;',
    l30: 'margin-left: 30px;',
    l40: 'margin-left: 40px;',
    l50: 'margin-left: 50px;',

    r0: 'margin-right: 0;',
    r1: 'margin-right: 1px;',
    r2: 'margin-right: 2px;',
    r3: 'margin-right: 3px;',
    r5: 'margin-right: 5px;',
    r10: 'margin-right: 10px;',
    r15: 'margin-right: 15px;',
    r20: 'margin-right: 20px;',
    r25: 'margin-right: 25px;',
    r30: 'margin-right: 30px;',
    r40: 'margin-right: 40px;',
    r50: 'margin-right: 50px;',

    center: (top = 0, bottom = 0) => Number.isInteger(top) && Number.isInteger(bottom) ? `margin: ${top}px auto ${bottom}px auto;` : `margin: ${top} auto ${bottom} auto;`,
    left: (v) => Number.isInteger(v) ? `margin-left: ${v}px;` : `margin-left: ${v};`,
    right: (v) => Number.isInteger(v) ? `margin-right: ${v}px;` : `margin-right ${v};`,
    top: (v) => Number.isInteger(v) ? `margin-top: ${v}px;` : `margin-top: ${v};`,
    bottom: (v) => Number.isInteger(v) ? `margin-bottom: ${v}px;` : `margin-bottom: ${v};`,
    get: (v) => Number.isInteger(v) ? `margin: ${v}px;` : `margin: ${v};`,
  },

  p: {
    a0: 'padding: 0;',
    a1: 'padding: 1px;',
    a2: 'padding: 2px;',
    a3: 'padding: 3px;',
    a5: 'padding: 5px;',
    a10: 'padding: 10px;',
    a15: 'padding: 15px;',
    a20: 'padding: 20px;',
    a25: 'padding: 25px;',
    a30: 'padding: 30px;',
    a40: 'padding: 40px;',
    a50: 'padding: 50px;',

    h0: 'padding-left: 0; padding-right: 0;',
    h1: 'padding-left: 1px; padding-right: 1px;',
    h2: 'padding-left: 2px; padding-right: 2px;',
    h3: 'padding-left: 3px; padding-right: 3px;',
    h5: 'padding-left: 5px; padding-right: 5px;',
    h10: 'padding-left: 10px; padding-right: 10px;',
    h15: 'padding-left: 15px; padding-right: 15px;',
    h20: 'padding-left: 20px; padding-right: 20px;',
    h25: 'padding-left: 25px; padding-right: 25px;',
    h30: 'padding-left: 30px; padding-right: 30px;',
    h40: 'padding-left: 40px; padding-right: 40px;',
    h50: 'padding-left: 50px; padding-right: 50px;',

    v0: 'padding-top: 0; padding-bottom: 0;',
    v1: 'padding-top: 1px; padding-bottom: 1px;',
    v2: 'padding-top: 2px; padding-bottom: 2px;',
    v3: 'padding-top: 3px; padding-bottom: 3px;',
    v5: 'padding-top: 5px; padding-bottom: 5px;',
    v10: 'padding-top: 10px; padding-bottom: 10px;',
    v15: 'padding-top: 15px; padding-bottom: 15px;',
    v20: 'padding-top: 20px; padding-bottom: 20px;',
    v25: 'padding-top: 25px; padding-bottom: 25px;',
    v30: 'padding-top: 30px; padding-bottom: 30px;',
    v40: 'padding-top: 40px; padding-bottom: 40px;',
    v50: 'padding-top: 50px; padding-bottom: 50px;',

    t0: 'padding-top: 0;',
    t1: 'padding-top: 1px;',
    t2: 'padding-top: 2px;',
    t3: 'padding-top: 3px;',
    t5: 'padding-top: 5px;',
    t10: 'padding-top: 10px;',
    t15: 'padding-top: 15px;',
    t20: 'padding-top: 20px;',
    t25: 'padding-top: 25px;',
    t30: 'padding-top: 30px;',
    t40: 'padding-top: 40px;',
    t50: 'padding-top: 50px;',

    b0: 'padding-bottom: 0;',
    b1: 'padding-bottom: 1px;',
    b2: 'padding-bottom: 2px;',
    b3: 'padding-bottom: 3px;',
    b5: 'padding-bottom: 5px;',
    b10: 'padding-bottom: 10px;',
    b15: 'padding-bottom: 15px;',
    b20: 'padding-bottom: 20px;',
    b25: 'padding-bottom: 25px;',
    b30: 'padding-bottom: 30px;',
    b40: 'padding-bottom: 40px;',
    b50: 'padding-bottom: 50px;',

    l0: 'padding-left: 0;',
    l1: 'padding-left: 1px;',
    l2: 'padding-left: 2px;',
    l3: 'padding-left: 3px;',
    l5: 'padding-left: 5px;',
    l10: 'padding-left: 10px;',
    l15: 'padding-left: 15px;',
    l20: 'padding-left: 20px;',
    l25: 'padding-left: 25px;',
    l30: 'padding-left: 30px;',
    l40: 'padding-left: 40px;',
    l50: 'padding-left: 50px;',

    r0: 'padding-right: 0;',
    r1: 'padding-right: 1px;',
    r2: 'padding-right: 2px;',
    r3: 'padding-right: 3px;',
    r5: 'padding-right: 5px;',
    r10: 'padding-right: 10px;',
    r15: 'padding-right: 15px;',
    r20: 'padding-right: 20px;',
    r25: 'padding-right: 25px;',
    r30: 'padding-right: 30px;',
    r40: 'padding-right: 40px;',
    r50: 'padding-right: 50px;',

    left: (v) => Number.isInteger(v) ? `padding-left: ${v}px;` : `padding-left: ${v};`,
    right: (v) => Number.isInteger(v) ? `padding-right: ${v}px;` : `padding-right ${v};`,
    top: (v) => Number.isInteger(v) ? `padding-top: ${v}px;` : `padding-top: ${v};`,
    bottom: (v) => Number.isInteger(v) ? `padding-bottom: ${v}px;` : `padding-bottom: ${v};`,
    get: (v) => Number.isInteger(v) ? `padding: ${v}px;` : `padding: ${v};`,
  },

  scrollbar: {
    t0: (bar = color.gray, width = '3px', bg = color.alphagray) => `
    ::-webkit-scrollbar { width: ${width}; height: ${width}; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 ${width} ${bg}; }
    ::-webkit-scrollbar-thumb { background-color: ${bar}; }
    `,
    t1: `
    ::-webkit-scrollbar { width: 10px; height: 10px; background-color: ${color.dark}; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 0; background-color: ${color.gray}; }
    ::-webkit-scrollbar-thumb { border-radius: 0; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: rgba(68, 68, 68, 1); }
    `,
    t2: `
    ::-webkit-scrollbar { width: 6px; height: 6px; background-color: ${color.dark}; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: ${color.lightgray}; }
    ::-webkit-scrollbar-thumb { background-color: #000000; }
    `,
    t3: `
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px ${color.alphagray}; }
    ::-webkit-scrollbar-thumb { background-color: ${color.gray}; }
    `,
    t4: `
    ::-webkit-scrollbar { width: 14px; height: 14px; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px ${color.alphagray}; }
    ::-webkit-scrollbar-thumb { background-color: ${color.gray}; }
    `,

    get: (v = color.gray, bar = color.dark) => `
    ::-webkit-scrollbar { width: 10px; height: 10px; background-color: ${v}; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 0; background-color: ${v}; }
    ::-webkit-scrollbar-thumb { border-radius: 0; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); background-color: ${bar}; }
    `,

    hide: `
    ::-webkit-scrollbar { background-color: transparent; }
    ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 0 transparent; background-color: transparent; }
    ::-webkit-scrollbar-thumb { background-color: transparent; -webkit-box-shadow: inset 0 0 0 transparent; }
    `,
  },
};

export default cs;
