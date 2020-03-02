/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { STAT, EID, SCREEN, ST } from './Config';
import { Util, Editbox, Button, Loading, cs } from './index';
import cx from 'classnames/bind';
import styled from 'styled-components';
import * as actions from './actor/Action';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const StyledObject = styled.div`{
  &.editor-frame { padding-left: 10px; max-width: 100%; margin-top: 0px; position: relative;
    h1, h2, h3, h4, h5, h6, p { color: #000 };

    .ed-navi { position: relative; margin-bottom: 20px; text-align: right; }

    .ed-body { width: 100%; margin-top: 20px; color: #000; min-height: calc(400px); background: ${cs.color.white};
      .rdw-editor-wrapper {

        .rdw-editor-toolbar {
          .rdw-option-wrapper {
            ${cs.border.lightgray} height: 28px; width: 34px;
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
            width: 300px; height: 200px;
            .rdw-colorpicker-modal-options { overflow: auto; }
            .rdw-colorpicker-option { box-shadow: none; }
          }

          .rdw-link-modal, .rdw-embedded-modal { 
            width: 300px; min-height: 260px;
          }

          .rdw-embedded-modal-header-option, .rdw-embedded-modal-header-label, .rdw-embedded-modal-link-input,
          .rdw-embedded-modal-size-input {
            width: 100%;
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


function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}

// const isIE =  /*@cc_on!@*/false || !!document.documentMode;

// var CKEditor = null, ClassicEditor = null;

// let API = URL.API.PAGE;

export default class Texteditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.api = props.api || '';
    this.state = { type: SCREEN.ST.PC, rowid: props.rowid, editorState: EditorState.createEmpty(), loaded: false };
    this.doReload();
  }

  doReload = (value = this.state.rowid) => {
    actions.doSelect(this.api, { rowid: value }, true).then(({ result }) => {
      let data = result && result.txt ? result.txt : "";
      if (data) {
        data = data ? Util.parseJson(data) : "";
        data = data ? convertFromRaw(data) : "";
      }
      
      data = data ? EditorState.createWithContent(data) : EditorState.createEmpty();

      this.setState({ editorState: data, ...result, loaded: true });
    })
  }

  onChange = (state) => {
    if (this.props.readonly) return;
    this.setState({ editorState: state });
  }

  onFocusEditor = () => {
    if (this.props.readonly) return;
    
    if (this.editor) {
      // const editor = this.editor.getWrapperRef();
      this.editor.focus();
    }
  };
  
  componentDidMount() {
    // this.doReload();
    window.addEventListener('resize', this.checkScreen);
    this.title && this.title.focus();
  }

  // componentWillMount() {
  //   this.checkScreen();
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreen);
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
      item.text = Util.toJson(item.text);
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
    const data = this.parseData(value);
    const text = data.replace(/\\"/gi, "'");
    const item = { 'title': title, 'rowid': rowid, 'txt': text };
    const state = rowid ? STAT.U : STAT.I;

    if (state === STAT.I) {
      actions.doInsert(this.api, item).then(({ code, result }) => {
        // Util.showAlert(this.props, code);
        // this.doReload();
        this.props.onClick && this.props.onClick(EID.SAVE, code);
      });
    } else {
      actions.doUpdate(this.api, item).then(({ code, result }) => {
        this.props.onClick && this.props.onClick(EID.SAVE, code);
        // Util.showAlert(this.props, code);
        // this.doReload();
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
    actions.doDelete(this.api, { rowid: this.state.rowid }).then(({ code, result }) => {
      this.props.onClick && this.props.onClick(EID.DELETE);
    });
  }

  render() {
    const { title, loaded } = this.state;
    const { readonly = false } = this.props;

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
      image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
    };

    return (
      <StyledObject className={cx("editor-frame", {readonly})}>
        <div className="ed-navi">
          {!readonly && <Button title={ST.DELETE} className="btn-del dark mR20" onClick={this.onDelete} eid={EID.DELETE} />}
          {!readonly && <Button title={ST.SAVE} className="btn-save red mR10" onClick={() => this.onClick(true)} eid={EID.OK} />}
          <Button title={readonly ? ST.CLOSE : ST.CANCEL} className="btn-cancel white" onClick={() => this.onClick(false)} eid={EID.CANCEL} />
        </div>
        <div className="ed-head">
          {readonly && <p className="ed-title">{title}</p>}
          {!readonly && <Editbox ref={(ref) => { this.title = ref }} name="title" className="" type="text"
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