(function () {
    console.log('commandsListener.js running...');

    function commandsListener(command) {
        if (command == 'reload_extension') {
            chrome.runtime.reload();
        }
    }

    // chrome.commands.onCommand.addListener(commandsListener);
})();