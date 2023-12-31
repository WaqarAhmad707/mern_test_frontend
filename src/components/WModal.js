import { Modal } from "antd";

// Modal component
const WModal = ({ isOpen, title, onCancel, children }) => {
  return (
    <Modal
      title={title}
      centered
      open={isOpen}
      onCancel={() => onCancel(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};
export default WModal;
