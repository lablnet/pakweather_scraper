import os
import boto3
import tqdm


TABLE_NAME = 'pak_weather'
REGION = 'us-east-1'

dynamodb = boto3.resource('dynamodb', region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

SCHEMAS = ['date', 'country', 'latitude', 'longitude', 'city', 'currentCondition',
           'temp', 'feelLikeTemp', 'wind', 'Wind Directin', 'uv_index',
           'VisibilityValue', 'pressure', 'humidity', 'dewPoint', 'moonPhase',
           'high', 'low', 'sunset', 'sunrise', 'airQualityNumber',
           'airQualityText', 'airQualityDescription']


def put_row_to_dynamodb(row):
    """
  Inserts a single row of data into the DynamoDB table.

  Args:
      row (dict): A  dictionary containing the data to be inserted, 
          with keys matching the schema (SCHEMAS). 
          Values should be strings.

    """
    # Convert all values to strings
    row = {k: str(v) for k, v in row.items()}
    table.put_item(Item=row)


def put_rows_to_dynamodb(rows):
    """
  Efficiently inserts multiple rows of data into the DynamoDB table 
  using batch writing.

  Args:
       rows (list): A list of dictionaries, where each dictionary 
          represents a row of data with keys matching the schema (SCHEMAS).
          Values should be strings. 
    """

    with table.batch_writer() as batch:
        for row in rows:
            # Convert all values to strings
            row = {k: str(v) for k, v in row.items()}
            batch.put_item(Item=row)


def upload_data_to_dynamodb(csv_file_path):
    """
  Reads data from a CSV file, converts it into a list of dictionaries,
  and uploads it to the DynamoDB table in batches.
  After successful upload, the CSV file is deleted.

   Args:
      csv_file_path (str): The path to the CSV file containing the data.
          The CSV file should have a header row with columns 
          matching the schema (SCHEMAS).
    """
    with open(csv_file_path, 'r') as f:
        lines = f.readlines()

    data = []
    for line in lines[1:]:  # Start from the second line
        row = line.strip().split(',')
        # Combine the last two fields into a single field
        if len(row) > 23:
            row[-2:] = [','.join(row[-2:])]
        data.append(row)

    # Split data into chunks of 25 rows each
    chunks = [data[i:i + 25] for i in range(0, len(data), 25)]
    for chunk in chunks:
        rows = [dict(zip(SCHEMAS, row)) for row in chunk]
        put_rows_to_dynamodb(rows)

    # Delete the CSV file after it has been uploaded to DynamoDB
    os.remove(csv_file_path)


def put_all_data_to_dynamodb():
    # Iterate over folders and files
    for year in tqdm.tqdm(sorted(os.listdir('data'))):
        year_folder = os.path.join('data', year)
        if os.path.isdir(year_folder):
            print(f'Processing year {year}')
            for month in tqdm.tqdm(sorted(os.listdir(year_folder))):
                csv_file_path = os.path.join(year_folder, month)
                if csv_file_path.endswith('.csv'):
                    print(f'Uploading {csv_file_path} to DynamoDB')
                    upload_data_to_dynamodb(csv_file_path)


if __name__ == '__main__':
    put_all_data_to_dynamodb()
