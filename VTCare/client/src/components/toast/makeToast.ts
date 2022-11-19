import { createToast, ToastContentType, ToastType } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default function makeToast(title = "", type : ToastType = 'default', description = "") {
    createToast({
        title: title,
        description: description
    }, {
        type: type,
        timeout: 5000,
        showCloseButton: true,
        position: 'bottom-right',
        transition: 'bounce',
        hideProgressBar: false,
        swipeClose: true,
        showIcon: true
    })
}
