var Push = require('Push');

Push.addEventListener('register', function(e) {
    // Register push notification.
});

Push.addEventListener('received', function(e) {
    Titanium.Media.vibrate();

    var dialog = Ti.UI.createAlertDialog({
        message: e.push.data.alert,
        title: 'Your App!'
    });

    dialog.show();
});

Push.addEventListener('enable', function(e) {
    // When push notification is enabled.
});

(function() {
    Push.register();
})();
