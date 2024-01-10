import ReactModal from "react-modal";
import CreateMenu from "./CreateMenu";

function ModalMenu({ closeMenuModal }) {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={closeMenuModal}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <button className="close-button" onClick={closeMenuModal}>
          X
        </button>
        <CreateMenu />
      </div>
    </ReactModal>
  );
}

export default ModalMenu;
