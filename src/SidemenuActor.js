/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { openSidemenu } from './actor/Reducer';
import { ST } from './Config';

const SidemenuActor = (props) => {
  useEffect(() => {
    openSidemenu(props);
  }, [props]);

  const openSidemenu = (value) => {
    let data = { ...value };
    data.show = data.show || false;
    data.className = value.className == null ? '' : value.className;
    data.title = value.title == null ? '' : value.title;
    data.children = value.children == null ? null : value.children;
    data.ok = value.ok == null ? ST.OK : value.ok;
    data.cancel = value.cancel == null ? ST.CANCEL : value.cancel;
    props.openSidemenu(data);
  }

  return null;
}

export default connect(null, (dispatch) => ({ openSidemenu: (obj) => dispatch(openSidemenu(obj)) }))(SidemenuActor);
