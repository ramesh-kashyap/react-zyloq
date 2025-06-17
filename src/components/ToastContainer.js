import { toast } from 'react-toastify';

export const showCenteredToast = (message) => {

    // alert(message);
  toast(
    <div className="custom-spinner-toast">
      <div className="global-spinner">{message}</div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      className: 'toast-loading-wrapper'
    }
  );
};