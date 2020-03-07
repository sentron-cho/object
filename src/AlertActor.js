import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from './actor/Reducer';
import { ST, CODE } from './Config';

class AlertActor extends React.PureComponent {
  constructor(props) {
    super(props);

    if (props.show) {
      this.showAlert(props.data);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.showAlert(nextProps.data || nextProps);
    }
  }

  showAlert = (data) => {
    let msg = ST.NOTI.SUCCESS, type = 'info';
    if (data == null || data.code === CODE.SUCCESS) {
      msg = ST.NOTI.SUCCESS;
      type = 'info';
    } else if (data.code === CODE.FAILUER) {
      msg = ST.NOTI.FAILUER;
      type = 'err';
    } else if (data.code === CODE.WARNING) {
      msg = ST.NOTI.WARNING;
      type = 'warn';
    } else {
      msg = data.msg ? data.msg : ST.NOTI.WARNING;
      type = data.type ? data.type : 'warn';
    }

    this.props.showAlert({
      msg: msg, type: type, size: data.size || '', ...data, 
      onClose: (data == null || data.onClose == null) ? () => console.log('fire at closing event') : data.onClose,
    });
  }

  render() {
    return null;
  }
}

export default connect(null, (dispatch) => ({ showAlert: (obj) => dispatch(showAlert(obj)) }))(AlertActor);