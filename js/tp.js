let isLeavePopupEnabled = JSON.parse(localStorage.getItem('leavePopupEnabled'));

if (isLeavePopupEnabled === null) {
    isLeavePopupEnabled = false;
}

window.addEventListener('beforeunload', function (e) {
    if (isLeavePopupEnabled) {
        e.preventDefault();
        e.returnValue = '';
    }
});

document.getElementById('enableLeavePopup').addEventListener('click', function () {
    isLeavePopupEnabled = true;
    localStorage.setItem('leavePopupEnabled', JSON.stringify(isLeavePopupEnabled));

    alert('Enabled!');
});

document.getElementById('disableLeavePopup').addEventListener('click', function () {
    isLeavePopupEnabled = false;
    localStorage.setItem('leavePopupEnabled', JSON.stringify(isLeavePopupEnabled));

    alert('Disabled..');
});

if (isLeavePopupEnabled) {
    document.getElementById('enableLeavePopup').disabled = true;
    document.getElementById('disableLeavePopup').disabled = false;
} else {
    document.getElementById('enableLeavePopup').disabled = false;
    document.getElementById('disableLeavePopup').disabled = true;
}
