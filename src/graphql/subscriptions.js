/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTicketHistoryTableDev = /* GraphQL */ `
  subscription OnCreateTicketHistoryTableDev {
    onCreateTicketHistoryTableDev {
      messageId
      message
      ticketid
      title
      senderid
      img
    }
  }
`;
export const onUpdateTicketHistoryTableDev = /* GraphQL */ `
  subscription OnUpdateTicketHistoryTableDev(
    $messageId: Int
    $message: String
    $ticketid: Int
    $date_creation: AWSDateTime
    $title: String
  ) {
    onUpdateTicketHistoryTableDev(
      messageId: $messageId
      message: $message
      ticketid: $ticketid
      date_creation: $date_creation
      title: $title
    ) {
      messageId
      message
      ticketid
      date_creation
      title
      senderid
      img
    }
  }
`;
export const onDeleteTicketHistoryTableDev = /* GraphQL */ `
  subscription OnDeleteTicketHistoryTableDev(
    $messageId: Int
    $message: String
    $ticketid: Int
    $date_creation: AWSDateTime
    $title: String
  ) {
    onDeleteTicketHistoryTableDev(
      messageId: $messageId
      message: $message
      ticketid: $ticketid
      date_creation: $date_creation
      title: $title
    ) {
      messageId
      message
      ticketid
      date_creation
      title
      senderid
      img
    }
  }
`;
