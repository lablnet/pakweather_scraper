const { DynamoDBClient, ListTablesCommand, CreateTableCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs');
const { logger } = require('./log');
require('dotenv').config();

// Creating the DynamoDB client with AWS SDK v3
const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const table = process.env.TABLE;

const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

/**
 * Check if the record exists.
 * 
 * @param {object} key - The key.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {Boolean} - True if exists, false otherwise.
 */
async function checkRecordExists(key) {
  const params = {
    TableName: table,
    Key: key,
  };

  try {
    const { Item } = await docClient.send(new GetCommand(params));
    return Item !== undefined;
  } catch (error) {
    logger.log ('Error checking record exists:', error);
    throw error;
  }
}

/**
 * Read all records from the table.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - Records.
 */
async function readAllRecords() {
  const params = {
    TableName: table,
  };

  try {
    const { Items } = await docClient.send(new ScanCommand(params));
    return Items;
  } catch (error) {
    logger.log ('Error reading all records:', error);
    throw error;
  }
}

/**
 * Add or update the record.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The record.
 */
async function addOrUpdateRecord(item) {
  const params = {
    TableName: table,
    Item: item,
  };

  try {
    await docClient.send(new PutCommand(params));
    logger.log ('Add/Update successful', params);
    return params.Item;
  } catch (error) {
    logger.log ('Error adding/updating record:', error);
    throw error;
  }
}

/**
 * Create table if not exists.
 * 
 * @param {string} tableName - The table name.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {void}
 */
async function createTableIfNotExists(tableName) {
  const listTablesCommand = new ListTablesCommand({});
  const { TableNames } = await dynamoDBClient.send(listTablesCommand);
  if (!TableNames.includes(tableName)) {
    const params = {
      TableName: tableName,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    try {
      await dynamoDBClient.send(new CreateTableCommand(params));
      logger.log (`Table "${tableName}" created successfully.`);
    } catch (error) {
      logger.log ('Error creating table:', error);
      throw error;
    }
  } else {
    logger.log (`Table "${tableName}" already exists.`);
  }
}

module.exports = {
    checkRecordExists,
    addOrUpdateRecord,
    createTableIfNotExists,
    readAllRecords
};
