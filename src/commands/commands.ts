/*
 * Copyright (c) Document Redactor. All rights reserved.
 * Licensed under the MIT license.
 */

/* global Office */

Office.onReady(() => {
  // Office is ready
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event - The event object from Office
 */
function action(event: Office.AddinCommands.Event) {
  const message: Office.NotificationMessageDetails = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Document Redactor is ready to use.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message
  Office.context.mailbox?.item?.notificationMessages.replaceAsync("action", message);

  // Complete the action
  event.completed();
}

// Register the function with Office
Office.actions.associate("action", action);
