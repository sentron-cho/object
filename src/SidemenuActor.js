import React from 'react';
import { connect } from 'react-redux';
import { openSidemenu } from '../actor/Reducer';
import { ST, STAT } from './Config';

class SidemenuActor extends React.PureComponent {
  constructor(props) {
    super(props);

    if (props.show) {
      this.openSidemenu(props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.openSidemenu(nextProps);
    } else {

    }
  }

  openSidemenu = (value) => {
    let data = { ...value };
    data.show = true;
    data.className = value.className == null ? '' : value.className;
    data.title = value.title == null ? '' : value.title;
    data.children = value.children == null ? null : value.children;
    data.ok = value.ok == null ? ST.OK : value.ok;
    data.cancel = value.cancel == null ? ST.CANCEL : value.cancel;
    this.props.openSidemenu(data);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSidemenu: (obj) => dispatch(openSidemenu(obj)),
  };
};

export default connect(null, mapDispatchToProps)(SidemenuActor);
