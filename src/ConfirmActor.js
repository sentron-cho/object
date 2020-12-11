import React from 'react';
import { connect } from 'react-redux';
import { openConfirm, closeConfirm } from './actor/Reducer';
import { ST } from './Config';

class ConfirmActor extends React.PureComponent {
  constructor(props) {
    super(props);

    if (props.show) {
      this.openConfirm(props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.openConfirm(nextProps);
    } else {
      this.props.closeConfirm({ show: false });
    }
  }

  openConfirm = (value) => {
    let data = { ...value };
    data.show = true;
    data.type = value.type == null ? '' : value.type;
    data.className = value.className == null ? '' : value.className;
    data.title = value.title == null ? ST.ALARM : value.title;
    data.ok = value.ok == null ? ST.OK : value.ok;
    data.cancel = value.cancel === false ? '' : value.cancel == null ? ST.CANCEL : value.cancel;
    data.msg = value.msg == null ? ST.NOTI.ISDELETE : value.msg;
    data.children = data.children || null;
    data.onClicked = value.onClicked == null ? null : value.onClicked;
    this.props.openConfirm(data);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirm: (obj) => dispatch(openConfirm(obj)),
    closeConfirm: (obj) => dispatch(closeConfirm(obj)),
  };
};

export default connect(null, mapDispatchToProps)(ConfirmActor);
