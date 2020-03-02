import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actor/Reducer';
import { ST, STAT } from './Config';

class ModalActor extends React.PureComponent {
  constructor(props) {
    super(props);

    if (props.show) {
      this.openModal(props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.openModal(nextProps);
    } else {

    }
  }

  openModal = (value) => {
    let data = { ...value };
    data.show = true;
    data.className = value.className == null ? '' : value.className;
    data.title = value.title == null ? ST.ALARM : value.title;
    data.children = value.children == null ? null : value.children;
    data.data = value.data == null ? {} : value.data;
    data.size = value.size == null ? '' : value.size;
    data.desc = value.desc == null ? '' : value.desc;
    data.state = value.state == null ? STAT.N : value.state;
    data.ok = value.ok == null ? ST.OK : value.ok;
    data.cancel = value.cancel == null ? ST.CANCEL : value.cancel;
    this.props.openModal(data);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (obj) => dispatch(openModal(obj)),
  };
};

export default connect(null, mapDispatchToProps)(ModalActor);
