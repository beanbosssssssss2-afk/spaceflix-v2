let isLeavePopupEnabled = JSON.parse(localStorage.getItem('leavePopupEnabled'));

if (typeof isLeavePopupEnabled !== 'boolean') {
    isLeavePopupEnabled = false;
}

window.addEventListener('beforeunload', function (e) {
    if (isLeavePopupEnabled) {
        e.preventDefault();
        e.returnValue = '';
    }
});

function updateLeavePopupButtons(enableBtn, disableBtn) {
    if (!enableBtn || !disableBtn) return;
    if (isLeavePopupEnabled) {
        enableBtn.disabled = true;
        disableBtn.disabled = false;
    } else {
        enableBtn.disabled = false;
        disableBtn.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const enableBtn = document.getElementById('enableLeavePopup');
    const disableBtn = document.getElementById('disableLeavePopup');

    if (enableBtn) {
        enableBtn.addEventListener('click', function () {
            isLeavePopupEnabled = true;
            localStorage.setItem('leavePopupEnabled', JSON.stringify(isLeavePopupEnabled));
            updateLeavePopupButtons(enableBtn, disableBtn);
            alert('Enabled!');
        });
    }

    if (disableBtn) {
        disableBtn.addEventListener('click', function () {
            isLeavePopupEnabled = false;
            localStorage.setItem('leavePopupEnabled', JSON.stringify(isLeavePopupEnabled));
            updateLeavePopupButtons(enableBtn, disableBtn);
            alert('Disabled..');
        });
    }

    updateLeavePopupButtons(enableBtn, disableBtn);
});
