import { useEffect } from 'react';
import { connect } from 'react-redux';
import { openModal } from './actor/Reducer';
import { ST } from './Config';

const ModalActor = (props) => {
  useEffect(() => {
    openModal(props);
  }, [props]);

  const openModal = (value) => {
    let data = { ...value };
    data.show = data.show || false;
    data.className = value.className == null ? '' : value.className;
    data.title = value.title == null ? ST.ALARM : value.title;
    data.children = value.children == null ? null : value.children;
    data.data = value.data == null ? {} : value.data;
    data.size = value.size == null ? '' : value.size;
    data.desc = value.desc == null ? '' : value.desc;
    data.state = value.state == null ? 'NONE' : value.state;
    data.ok = value.ok == null ? ST.OK : value.ok;
    data.cancel = value.cancel == null ? ST.CANCEL : value.cancel;
    props.openModal(data);
  }

  return null;
}

export default connect(null, (dispatch) => ({ openModal: (obj) => dispatch(openModal(obj)) }))(ModalActor);