/* Helper function */
export const downloadFile = (fileURL, fileName) => {
    // for non-IE
    if (!window.ActiveXObject) {
        const save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        const filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
        save.download = fileName || filename;
        if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
            document.location = save.href;
// window event not working here
        }else{
            const evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        const _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
};