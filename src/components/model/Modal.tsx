
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={onClose} className="modal-close-button">Close</button>
//         {children}
//       </div>
//       <style jsx>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .modal-content {
//           background: white;
//           padding: 20px;
//           border-radius: 8px;
//           position: relative;
//         }
//         .modal-close-button {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Modal;
