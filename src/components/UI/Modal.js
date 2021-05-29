import style from './Modal.module.css';
import {Fragment} from 'react';
import ReactDom from 'react-dom';

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.hideCart}></div>
}

const ModalOverlay = (props) => {
  return <div className={style.modal}>
    <div>{props.children}</div>
  </div>
}
const Modal = (props) => {
  const overlay = document.getElementById('overlay');
  return <Fragment>
    {/* <Backdrop />
    <ModalOverlay>
        {props.children}
    </ModalOverlay> */}
    {ReactDom.createPortal(<Backdrop hideCart={props.hideCart}/>, overlay)}
    {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlay )}
  </Fragment>
}

export default Modal;
