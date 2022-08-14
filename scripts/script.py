import csv
data = []
with open('pk.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        data.append(
            {
                "name": row[0],
                "lat": row[1],
                "lng": row[2],
            }
        )

print(data)
