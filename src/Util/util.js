export const ALLOWED_FILES = ['png', 'jpg', 'jpge', 'jpeg', 'doc', 'pdf', 'docx', 'xlsx', 'xls', 'csv', 'gif'];
export const IMAGE = ['png', 'jpg', 'jpge', 'gif', 'jpeg'];

const util = {
    formatMoney: (amount) => {
        return '$' + (amount).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'CLP',
        });
    },
    onFileChange: (selectorFiles, callback) => {
        const reader = new FileReader();
        var file = selectorFiles[0];
        reader.onload = (upload) => {
            const type = file.type.split('/');
            if (ALLOWED_FILES.indexOf(type[1]) >= 0){
                callback({
                    data: upload.target.result,
                    name: file.name,
                    type: type[1],
                });
            }
            else{
                callback({error: 'Invalid format'});
            }
        };

        reader.readAsDataURL(file);
    }
};

export default util;