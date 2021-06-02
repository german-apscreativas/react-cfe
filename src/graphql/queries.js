/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTicketHistoryTableDev = /* GraphQL */ `
  query GetTicketHistoryTableDev($messageId: Int!) {
    getTicketHistoryTableDev(messageId: $messageId) {
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
export const listTicketHistoryTableDevs = /* GraphQL */ `
  query ListTicketHistoryTableDevs(
    $filter: TableTicketHistoryTableDevFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketHistoryTableDevs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        messageId
        message
        ticketid
        date_creation
        title
        senderid
        img
      }
      nextToken
    }
  }
`;
export const listTicketsHistoryPaginate = /* GraphQL */ `
  query ListTicketsHistoryPaginate(
    $filter: TableTicketHistoryTableDevFilterInput
    $count: Int
    $nextToken: String
  ) {
    listTicketsHistoryPaginate(
      filter: $filter
      count: $count
      nextToken: $nextToken
    ) {
      items {
        messageId
        message
        ticketid
        date_creation
        title
        senderid
        img
      }
      nextToken
    }
  }
`;
export const listTicketsHistoryTest = /* GraphQL */ `
  query ListTicketsHistoryTest(
    $ticketid: Int!
    $filter: TableTicketHistoryTableDevFilterInput
    $count: Int
    $nextToken: String
    $orderBy: String
  ) {
    listTicketsHistoryTest(
      ticketid: $ticketid
      filter: $filter
      count: $count
      nextToken: $nextToken
      orderBy: $orderBy
    ) {
      items {
        messageId
        message
        ticketid
        title
        senderid
        img
      }
      nextToken
    }
  }
`;
