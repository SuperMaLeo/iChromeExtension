(function() {
    console.log('commandsListener.js running...');

    chrome.commands.onCommand.addListener(function(command) {
        if (command == 'reload_extension') {
            chrome.runtime.reload();
        }
    });
})();