/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { STAT, EID, SCREEN, ST } from './Config';
import { Editbox, Button, Loading, cs } from './index';
import cx from 'classnames/bind';
import styled from 'styled-components';
import * as actions from './actor/Action';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const StyledObject = styled.div`{
  &.editor-loading {
    ${cs.align.ycenter} ${cs.w.full} ${cs.disp.block}
  }

  &.editor-frame { 
    ${cs.p.l10} ${cs.max.w('100%')} ${cs.m.t0} ${cs.pos.relative}

    h1, h2, h3, h4, h5, h6, p { ${cs.font.dark} };

    .ed-navi { ${cs.pos.relative} ${cs.m.b20} ${cs.font.right} 
      .button { ${cs.m.l20} } 
      .btn-del { ${cs.float.left} ${cs.m.l0} }
    }
    .ed-body { 
      ${cs.w.full} ${cs.m.t20} ${cs.font.dark} ${cs.min.h(400)} ${cs.bg.white}
      .rdw-editor-wrapper {
        .rdw-editor-toolbar {
          .rdw-option-wrapper {
            ${cs.border.lightgray} ${cs.h.get(28)} ${cs.w.get(34)}
            &:hover {
              ${cs.border.green} ${cs.bg.green} box-shadow: none;
            }
          }

          .rdw-option-active {
            box-shadow: none; ${cs.bg.green}
          }

          .rdw-dropdown-wrapper {
            ${cs.border.lightgray} ${cs.font.black}
            &:hover {
              ${cs.border.green} ${cs.bg.green} box-shadow: none;
            }
          }

          .rdw-dropdown-optionwrapper {
            &:hover { ${cs.border.green} box-shadow: none; min-width: 28px; }
          };

          .rdw-dropdown-selectedtext { ${cs.font.black} }

          .rdw-colorpicker-modal {
            ${cs.w.get(300)} ${cs.h.get(200)}
            .rdw-colorpicker-modal-options { overflow: auto; }
            .rdw-colorpicker-option { box-shadow: none; }
          }

          .rdw-link-modal, .rdw-embedded-modal { 
            width: 300px; min-height: 260px;
          }

          .rdw-embedded-modal-header-option, .rdw-embedded-modal-header-label, .rdw-embedded-modal-link-input,
          .rdw-embedded-modal-size-input {
            ${cs.w.full}
          }
          
          input { ${cs.border.lightgray} margin-bottom: 10px; line-height: 28px; min-height: 30px; padding: 2px 5px; }
          button { ${cs.bg.primary} ${cs.box.radius} ${cs.font.white} box-shadow: none; 
            &:disabled { ${cs.bg.gray} ${cs.font.lightgray} }
          }

          .rdw-image-mandatory-sign { display: none; }
        }

        .rdw-editor-main {
          max-height: 1000px; padding: 10px;
        }
      }
    }

    .loading-box {
      position: absolute; top: 0; left: 0; 
    }

    &.readonly {
      .ed-body { ${cs.bg.darkwhite} ${cs.border.line} }
      .ed-head {
        .ed-title { min-height: 30px;
          ${cs.border.lightgray} ${cs.bg.lightgray} ${cs.border.line} padding: 5px; line-height: 20px;
        }
      }
    }
  }
}`;

// function uploadImageCallBack(file) {
//   return new Promise(
//     (resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('POST', 'https://api.imgur.com/3/image');
//       xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
//       const data = new FormData();
//       data.append('image', file);
//       xhr.send(data);
//       xhr.addEventListener('load', () => {
//         const response = JSON.parse(xhr.responseText);
//         resolve(response);
//       });
//       xhr.addEventListener('error', () => {
//         const error = JSON.parse(xhr.responseText);
//         reject(error);
//       });
//     }
//   );
// }

export default class Texteditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.api = props.api || '';
    this.state = { type: SCREEN.ST.PC, rowid: props.rowid, editorState: EditorState.createEmpty(), loaded: false, modified: false, uploadedImages: [] };
    this.doReload(props.rowid);
  }

  doReload = (value = this.state.rowid) => {
    if (!value) {
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 200);
      return;
    }

    actions.doSelect(this.api, { rowid: value }, true).then(({ result }) => {
      let data = result && result.txt ? result.txt : "";
      if (data) {
        data = data ? JSON.parse(data) : ""; //Util.parseJson(data) : "";
        data = data ? convertFromRaw(data) : "";
      }

      data = data ? EditorState.createWithContent(data) : EditorState.createEmpty();

      this.setState({ editorState: data, ...result, loaded: true });
    })
  }

  onChange = (state) => {
    if (this.props.readonly) return;
    this.setState({ editorState: state, modified: true });
  }

  onFocusEditor = () => {
    if (this.props.readonly) return;

    if (this.editor) {
      // const editor = this.editor.getWrapperRef();
      this.editor.focus();
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.checkScreen);
    this.title && this.title.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  }

  uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = this.state.uploadedImages;
    const imageObject = { file: file, localSrc: URL.createObjectURL(file) }
    uploadedImages.push(imageObject);
    this.setState({ uploadedImages: uploadedImages })

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve, reject) => {
        const data = new FormData();
        data.append('image', file);
        actions.doInsert(`${this.api}/upload` || '/uploader', data).then(({ code, result }) => {
          // alert('success');
          resolve({ data: { link: result.url } });
        }).catch(err => {
          reject({ err: 'error' });
          // alert('fail');
        });
      }
    );
  }

  checkScreen = () => {
    let screen = window.innerWidth;
    const type = (screen <= SCREEN.MOBILE) ? SCREEN.ST.MOBILE : (screen <= SCREEN.TABLET) ? SCREEN.ST.TABLET : SCREEN.ST.PC;
    this.setState({ 'type': type });
  }

  parseData = (value) => {
    let data = value;
    data = convertToRaw(data);
    data && data.blocks && data.blocks.map(item => {
      item.text = item.text.replace(/"/gi, "＂"); //Util.toJson(item.text);
      item.text = item.text.replace(/'/gi, "＇");
      return 0;
    });
    // data = draftToHtml(data);
    data = JSON.stringify(data);
    return data;
  }

  onSave = () => {
    if (!this.title.isValidate()) return;

    const { editorState, rowid } = this.state;

    const title = this.title.getValue();
    const value = editorState.getCurrentContent();
    const text = this.parseData(value);
    const item = { 'title': title, 'rowid': rowid, 'txt': text };
    const state = rowid ? STAT.U : STAT.I;

    if (state === STAT.I) {
      actions.doInsert(this.api, item).then(({ code, result }) => {
        this.props.onClick && this.props.onClick(EID.SAVE, code);
      });
    } else {
      actions.doUpdate(this.api, item).then(({ code, result }) => {
        this.props.onClick && this.props.onClick(EID.SAVE, code);
      });
    }
  }

  onClick = (isOk) => {
    if (isOk) {
      this.onSave();
    } else {
      this.props.onClick && this.props.onClick(EID.CLOSE);
    }
  }

  onDelete = () => {
    console.dir(this.state);
    const { txt } = this.state;
    const json = JSON.parse(txt);
    console.dir(json);
    const { entityMap } = json;

    let images = [];
    Object.keys(entityMap).map(a => images.push(entityMap[a].data.src));

    actions.doDelete(this.api, { rowid: this.state.rowid, images }).then(({ code, result }) => {
      this.props.onClick && this.props.onClick(EID.DELETE);
    });
  }

  render() {
    const { title, loaded, modified } = this.state;
    const { readonly = false, className, rowid = 0 } = this.props;

    const toolbar = {
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
      inline: {
        bold: { className: undefined },
        italic: { className: undefined },
        underline: { className: undefined },
        options: ['bold', 'italic', 'underline'],
      },
      // list: { inDropdown: true },
      // textAlign: { inDropdown: true },
      // history: { inDropdown: false },
      image: {
        uploadCallback: this.uploadImageCallBack,
        previewImage: true, alt: { present: true, mandatory: false },
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
      },
    };

    if (!loaded) return <StyledObject className={cx("editor-loading")}><Loading className={''} /></StyledObject>

    return (
      <StyledObject className={cx("editor-frame", { readonly }, className)}>
        <div className="ed-navi">
          {!readonly && rowid > 0 && <Button title={ST.DELETE} className="btn-del black" onClick={this.onDelete} eid={EID.DELETE} />}
          <Button title={readonly ? ST.CLOSE : ST.CANCEL} className="btn-cancel white" onClick={() => this.onClick(false)} eid={EID.CANCEL} />
          {!readonly && <Button title={ST.SAVE} className="btn-save red" onClick={() => this.onClick(true)} eid={EID.OK} disabled={!modified} />}
        </div>
        <div className="ed-head">
          {readonly && <p className="ed-title">{title}</p>}
          {!readonly && <Editbox ref={(ref) => { this.title = ref }} name="title" className="" type="text" onChange={(v) => this.setState({ title: v, modified: true })}
            label={''} value={title} guide={ST.NO_INPUT_VALUE} maxLength="100" validate="true" readonly={readonly} />}
        </div>
        <div className="ed-body" onClick={this.onFocusEditor}>
          <Editor editorRef={(ref) => this.editor = ref}
            editorState={this.state.editorState}
            onEditorStateChange={this.onChange}
            wrapperClassName="ed-wrapper"
            editorClassName="ed-editor"
            toolbar={toolbar}
            localization={{ locale: 'ko' }}
            toolbarHidden={readonly}
            readOnly={readonly}
          />
        </div>

        {!loaded && <Loading />}
      </StyledObject>
    );
  }
}