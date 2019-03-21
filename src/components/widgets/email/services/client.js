import * as jmap from "jmap-client";
import AxiosTransport from "./axios-transport";

const JMAP_GET_MESSAGES_LIST = [
  "id",
  "blobId",
  "threadId",
  "headers",
  "subject",
  "from",
  "to",
  "cc",
  "bcc",
  "replyTo",
  "preview",
  "date",
  "isUnread",
  "isFlagged",
  "isDraft",
  "hasAttachment",
  "mailboxIds"
];

export default class EmailClient {
  constructor({ url, token }) {
    this.url = url;
    this.token = `Bearer ${token}`;

    this.client = new jmap.Client(new AxiosTransport()).withAPIUrl(this.url).withAuthenticationToken(this.token);
  }

  getMailboxes(role) {
    return this.client
      .getMailboxes()
      .then(mailboxes => mailboxes.filter(mailbox => mailbox.role && mailbox.role.value === role));
  }

  getEmails(role = "inbox", limit = 10, sort = ["date desc"]) {
    return this.getMailboxes(role).then(mailboxes => {
      return this.client
        .getMessageList({
          filter: { inMailboxes: mailboxes.map(mailbox => mailbox.id) },
          collapseThreads: false,
          fetchMessages: false,
          limit,
          sort
        })
        .then(messageList => messageList.getMessages({ properties: JMAP_GET_MESSAGES_LIST }));
    });
  }
}
