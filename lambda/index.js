const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
        query: req.query,
        body: req.body,
        headers: req.headers
    });
    next();
});

// Middleware
app.use(express.json());

// Static list of cities (from scraper/helper/data.js)
const cities = [
    { name: "Karachi", lat: "24.8600", lng: "67.0100" },
    { name: "Lahore", lat: "31.5497", lng: "74.3436" },
    { name: "Sialkot City", lat: "32.5000", lng: "74.5333" },
    { name: "Faisalabad", lat: "31.4180", lng: "73.0790" },
    { name: "Rawalpindi", lat: "33.6007", lng: "73.0679" },
    { name: "Peshawar", lat: "34.0000", lng: "71.5000" },
    { name: "Saidu Sharif", lat: "34.7500", lng: "72.3572" },
    { name: "Multan", lat: "30.1978", lng: "71.4711" },
    { name: "Gujranwala", lat: "32.1500", lng: "74.1833" },
    { name: "Islamabad", lat: "33.6989", lng: "73.0369" },
    { name: "Quetta", lat: "30.1920", lng: "67.0070" },
    { name: "Bahawalpur", lat: "29.3956", lng: "71.6722" },
    { name: "Sargodha", lat: "32.0836", lng: "72.6711" },
    { name: "New Mirpur", lat: "33.1333", lng: "73.7500" },
    { name: "Chiniot", lat: "31.7167", lng: "72.9833" },
    { name: "Sukkur", lat: "27.6995", lng: "68.8673" },
    { name: "Larkana", lat: "27.5600", lng: "68.2264" },
    { name: "Shekhupura", lat: "31.7083", lng: "74.0000" },
    { name: "Jhang City", lat: "31.2681", lng: "72.3181" },
    { name: "Rahimyar Khan", lat: "28.4202", lng: "70.2952" },
    { name: "Gujrat", lat: "32.5736", lng: "74.0789" },
    { name: "Kasur", lat: "31.1167", lng: "74.4500" },
    { name: "Mardan", lat: "34.1958", lng: "72.0447" },
    { name: "Mingaora", lat: "34.7717", lng: "72.3600" },
    { name: "Dera Ghazi Khan", lat: "30.0500", lng: "70.6333" },
    { name: "Nawabshah", lat: "26.2442", lng: "68.4100" },
    { name: "Sahiwal", lat: "30.6706", lng: "73.1064" },
    { name: "Mirpur Khas", lat: "25.5269", lng: "69.0111" },
    { name: "Okara", lat: "30.8100", lng: "73.4597" },
    { name: "Mandi Burewala", lat: "30.1500", lng: "72.6833" },
    { name: "Jacobabad", lat: "28.2769", lng: "68.4514" },
    { name: "Saddiqabad", lat: "28.3006", lng: "70.1302" },
    { name: "Kohat", lat: "33.5869", lng: "71.4414" },
    { name: "Muridke", lat: "31.8020", lng: "74.2550" },
    { name: "Muzaffargarh", lat: "30.0703", lng: "71.1933" },
    { name: "Khanpur", lat: "28.6471", lng: "70.6620" },
    { name: "Gojra", lat: "31.1500", lng: "72.6833" },
    { name: "Mandi Bahauddin", lat: "32.5861", lng: "73.4917" },
    { name: "Abbottabad", lat: "34.1500", lng: "73.2167" },
    { name: "Dadu", lat: "26.7319", lng: "67.7750" },
    { name: "Khuzdar", lat: "27.8000", lng: "66.6167" },
    { name: "Pakpattan", lat: "30.3500", lng: "73.4000" },
    { name: "Tando Allahyar", lat: "25.4667", lng: "68.7167" },
    { name: "Vihari", lat: "30.0419", lng: "72.3528" },
    { name: "Jaranwala", lat: "31.3342", lng: "73.4194" },
    { name: "Kamalia", lat: "30.7258", lng: "72.6447" },
    { name: "Kot Addu", lat: "30.4700", lng: "70.9644" },
    { name: "Nowshera", lat: "34.0153", lng: "71.9747" },
    { name: "Swabi", lat: "34.1167", lng: "72.4667" },
    { name: "Dera Ismail Khan", lat: "31.8167", lng: "70.9167" },
    { name: "Chaman", lat: "30.9210", lng: "66.4597" },
    { name: "Charsadda", lat: "34.1453", lng: "71.7308" },
    { name: "Kandhkot", lat: "28.4000", lng: "69.3000" },
    { name: "Hasilpur", lat: "29.6967", lng: "72.5542" },
    { name: "Muzaffarabad", lat: "34.3700", lng: "73.4711" },
    { name: "Mianwali", lat: "32.5853", lng: "71.5436" },
    { name: "Jalalpur Jattan", lat: "32.7667", lng: "74.2167" },
    { name: "Bhakkar", lat: "31.6333", lng: "71.0667" },
    { name: "Zhob", lat: "31.3417", lng: "69.4486" },
    { name: "Kharian", lat: "32.8110", lng: "73.8650" },
    { name: "Mian Channun", lat: "30.4397", lng: "72.3544" },
    { name: "Jamshoro", lat: "25.4283", lng: "68.2822" },
    { name: "Pattoki", lat: "31.0214", lng: "73.8528" },
    { name: "Harunabad", lat: "29.6100", lng: "73.1361" },
    { name: "Toba Tek Singh", lat: "30.9667", lng: "72.4833" },
    { name: "Shakargarh", lat: "32.2628", lng: "75.1583" },
    { name: "Hujra Shah Muqim", lat: "30.7333", lng: "73.8167" },
    { name: "Kabirwala", lat: "30.4068", lng: "71.8667" },
    { name: "Mansehra", lat: "34.3333", lng: "73.2000" },
    { name: "Lala Musa", lat: "32.7012", lng: "73.9605" },
    { name: "Nankana Sahib", lat: "31.4492", lng: "73.7124" },
    { name: "Bannu", lat: "32.9889", lng: "70.6056" },
    { name: "Timargara", lat: "34.8281", lng: "71.8408" },
    { name: "Parachinar", lat: "33.8992", lng: "70.1008" },
    { name: "Gwadar", lat: "25.1264", lng: "62.3225" },
    { name: "Abdul Hakim", lat: "30.5522", lng: "72.1278" },
    { name: "Hassan Abdal", lat: "33.8195", lng: "72.6890" },
    { name: "Tank", lat: "32.2167", lng: "70.3833" },
    { name: "Hangu", lat: "33.5281", lng: "71.0572" },
    { name: "Risalpur Cantonment", lat: "34.0049", lng: "71.9989" },
    { name: "Karak", lat: "33.1167", lng: "71.0833" },
    { name: "Kundian", lat: "32.4522", lng: "71.4718" },
    { name: "Umarkot", lat: "25.3614", lng: "69.7361" },
    { name: "Chitral", lat: "35.8511", lng: "71.7889" },
    { name: "Dainyor", lat: "35.9206", lng: "74.3783" },
    { name: "Kulachi", lat: "31.9286", lng: "70.4592" },
    { name: "Kotli", lat: "33.5156", lng: "73.9019" },
    { name: "Gilgit", lat: "35.9208", lng: "74.3144" },
    { name: "Hyderabad City", lat: "25.3969", lng: "68.3772" },
    { name: "Narowal", lat: "32.1020", lng: "74.8730" },
    { name: "Khairpur Mir's", lat: "27.5295", lng: "68.7592" },
    { name: "Khanewal", lat: "30.3017", lng: "71.9321" },
    { name: "Jhelum", lat: "32.9333", lng: "73.7333" },
    { name: "Haripur", lat: "33.9942", lng: "72.9333" },
    { name: "Shikarpur", lat: "27.9556", lng: "68.6382" },
    { name: "Rawala Kot", lat: "33.8578", lng: "73.7604" },
    { name: "Hafizabad", lat: "32.0709", lng: "73.6880" },
    { name: "Lodhran", lat: "29.5339", lng: "71.6324" },
    { name: "Malakand", lat: "34.5656", lng: "71.9304" },
    { name: "Attock City", lat: "33.7667", lng: "72.3598" },
    { name: "Batgram", lat: "34.6796", lng: "73.0263" },
    { name: "Matiari", lat: "25.5971", lng: "68.4467" },
    { name: "Ghotki", lat: "28.0064", lng: "69.3150" },
    { name: "Naushahro Firoz", lat: "26.8401", lng: "68.1227" },
    { name: "Alpurai", lat: "34.9000", lng: "72.6556" },
    { name: "Bagh", lat: "33.9803", lng: "73.7747" },
    { name: "Daggar", lat: "34.5111", lng: "72.4844" },
    { name: "Bahawalnagar", lat: "29.9983", lng: "73.2527" },
    { name: "Leiah", lat: "30.9646", lng: "70.9444" },
    { name: "Tando Muhammad Khan", lat: "25.1239", lng: "68.5389" },
    { name: "Chakwal", lat: "32.9300", lng: "72.8500" },
    { name: "Khushab", lat: "32.2952", lng: "72.3502" },
    { name: "Badin", lat: "24.6558", lng: "68.8383" },
    { name: "Lakki", lat: "32.6072", lng: "70.9123" },
    { name: "Rajanpur", lat: "29.1041", lng: "70.3297" },
    { name: "Dera Allahyar", lat: "28.4167", lng: "68.1667" },
    { name: "Shahdad Kot", lat: "27.8473", lng: "67.9068" },
    { name: "Pishin", lat: "30.5833", lng: "67.0000" },
    { name: "Sanghar", lat: "26.0464", lng: "68.9481" },
    { name: "Upper Dir", lat: "35.2074", lng: "71.8768" },
    { name: "Thatta", lat: "24.7461", lng: "67.9243" },
    { name: "Dera Murad Jamali", lat: "28.5466", lng: "68.2231" },
    { name: "Kohlu", lat: "29.8965", lng: "69.2532" },
    { name: "Mastung", lat: "29.7997", lng: "66.8455" },
    { name: "Dasu", lat: "35.2917", lng: "73.2906" },
    { name: "Athmuqam", lat: "34.5717", lng: "73.8972" },
    { name: "Loralai", lat: "30.3705", lng: "68.5979" },
    { name: "Barkhan", lat: "29.8977", lng: "69.5256" },
    { name: "Musa Khel Bazar", lat: "30.8594", lng: "69.8221" },
    { name: "Ziarat", lat: "30.3814", lng: "67.7258" },
    { name: "Gandava", lat: "28.6132", lng: "67.4856" },
    { name: "Sibi", lat: "29.5430", lng: "67.8773" },
    { name: "Dera Bugti", lat: "29.0362", lng: "69.1585" },
    { name: "Eidgah", lat: "35.3471", lng: "74.8563" },
    { name: "Turbat", lat: "26.0012", lng: "63.0485" },
    { name: "Uthal", lat: "25.8072", lng: "66.6219" },
    { name: "Khuzdar", lat: "27.7384", lng: "66.6434" },
    { name: "Chilas", lat: "35.4206", lng: "74.0967" },
    { name: "Kalat", lat: "29.0266", lng: "66.5936" },
    { name: "Panjgur", lat: "26.9644", lng: "64.0903" },
    { name: "Gakuch", lat: "36.1736", lng: "73.7667" },
    { name: "Qila Saifullah", lat: "30.7008", lng: "68.3598" },
    { name: "Kharan", lat: "28.5846", lng: "65.4150" },
    { name: "Aliabad", lat: "36.3078", lng: "74.6178" },
    { name: "Awaran", lat: "26.4568", lng: "65.2314" },
    { name: "Dalbandin", lat: "28.8885", lng: "64.4062" },
];

// Initialize DynamoDB client
// AWS SDK automatically uses IAM role credentials when running in Lambda
// For local development, it will use AWS credentials from environment or ~/.aws/credentials
const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
const TABLE_NAME = process.env.TABLE_NAME || 'pak_weather';
const GSI_NAME = 'latitude-longitude-index'; // Global Secondary Index name

/**
 * Helper function to parse date string
 */
function parseDate(dateString) {
    // Format: "2024-05-03 16:07:46.261590+05:00"
    const date = new Date(dateString);
    return date;
}

/**
 * Helper function to format date for comparison
 */
function formatDateForQuery(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Helper function to get current hour and previous hour timestamps
 */
function getHourRange() {
    const now = new Date();
    const currentHour = new Date(now);
    currentHour.setMinutes(0, 0, 0);

    const previousHour = new Date(currentHour);
    previousHour.setHours(previousHour.getHours() - 1);

    return { currentHour, previousHour };
}

/**
 * Helper function to scan all items from DynamoDB (handles pagination)
 * Optimized with parallel scanning and limits to prevent timeouts
 */
async function scanAllItems(params, maxItems = 50000) {
    const allItems = [];
    let lastEvaluatedKey = null;
    let totalScanned = 0;

    do {
        // Only include ExclusiveStartKey if it's not null
        const scanParams = {
            ...params,
            Limit: 1000 // Process in smaller chunks
        };

        if (lastEvaluatedKey) {
            scanParams.ExclusiveStartKey = lastEvaluatedKey;
        }

        const result = await docClient.send(new ScanCommand(scanParams));

        if (result.Items) {
            allItems.push(...result.Items);
            totalScanned += result.Items.length;
        }

        lastEvaluatedKey = result.LastEvaluatedKey;

        // Safety limit to prevent timeout
        if (totalScanned >= maxItems) {
            console.log(`Reached max items limit: ${maxItems}. Stopping scan.`);
            break;
        }
    } while (lastEvaluatedKey);

    return allItems;
}

/**
 * Helper function to query DynamoDB by latitude and longitude using GSI
 * Much faster than scanning the entire table
 */
async function queryWeatherDataByLocation(latitude, longitude, maxItems = 10000) {
    try {
        const params = {
            TableName: TABLE_NAME,
            IndexName: GSI_NAME,
            KeyConditionExpression: 'latitude = :lat AND longitude = :lng',
            ExpressionAttributeValues: {
                ':lat': latitude,
                ':lng': longitude
            },
            Limit: 1000 // Process in chunks
        };

        const allItems = [];
        let lastEvaluatedKey = null;
        let totalFetched = 0;

        do {
            const queryParams = {
                ...params
            };

            if (lastEvaluatedKey) {
                queryParams.ExclusiveStartKey = lastEvaluatedKey;
            }

            const result = await docClient.send(new QueryCommand(queryParams));

            if (result.Items) {
                allItems.push(...result.Items);
                totalFetched += result.Items.length;
            }

            lastEvaluatedKey = result.LastEvaluatedKey;

            // Safety limit to prevent timeout
            if (totalFetched >= maxItems) {
                console.log(`Reached max items limit: ${maxItems}. Stopping query.`);
                break;
            }
        } while (lastEvaluatedKey);

        return allItems;
    } catch (error) {
        // If GSI doesn't exist, fall back to scan (slower but works)
        if (error.name === 'ValidationException' && error.message.includes('index')) {
            console.warn('GSI not found, falling back to scan. Please create the index for better performance.');
            return await scanWeatherData({ latitude, longitude });
        }
        console.error('Error querying DynamoDB:', error);
        throw error;
    }
}

/**
 * Helper function to scan DynamoDB with filters (fallback method)
 * Only used if GSI is not available
 */
async function scanWeatherData(filters) {
    const filterExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    let index = 0;
    for (const [key, value] of Object.entries(filters)) {
        const nameKey = `#attr${index}`;
        const valueKey = `:val${index}`;
        filterExpressions.push(`${nameKey} = ${valueKey}`);
        expressionAttributeNames[nameKey] = key;
        expressionAttributeValues[valueKey] = value;
        index++;
    }

    const params = {
        TableName: TABLE_NAME,
        FilterExpression: filterExpressions.join(' AND '),
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
    };

    try {
        return await scanAllItems(params);
    } catch (error) {
        console.error('Error scanning DynamoDB:', error);
        throw error;
    }
}

/**
 * Helper function to filter by date range (for hour matching)
 */
function filterByHour(items, targetHour) {
    return items.filter(item => {
        if (!item.date) return false;
        const itemDate = parseDate(item.date);
        const itemHour = itemDate.getHours();
        const targetHourValue = targetHour.getHours();
        return itemHour === targetHourValue;
    });
}

// Root route handler
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({
        message: 'Pakistan Weather API',
        endpoints: [
            'GET /weather/today?latitude=<lat>&longitude=<lng>',
            'GET /weather/locations',
            'GET /weather/past?latitude=<lat>&longitude=<lng>&date=<optional>',
            'GET /weather/past/year?latitude=<lat>&longitude=<lng>&year=<optional>'
        ]
    });
});

/**
 * Get today's weather for current hour or previous hour
 * Also returns weather from last year same date
 */
app.get('/weather/today', async(req, res) => {
    try {
        console.log('GET /weather/today - Request received');
        const { latitude, longitude } = req.query;
        console.log('Query params:', { latitude, longitude });

        if (!latitude || !longitude) {
            console.log('Missing required parameters: latitude or longitude');
            return res.status(400).json({ error: 'latitude and longitude are required' });
        }

        const { currentHour, previousHour } = getHourRange();
        const today = new Date();
        console.log('Fetching weather data for location:', { latitude, longitude });

        // Get all records for this location using GSI Query (much faster than scan)
        const startTime = Date.now();
        const allRecords = await queryWeatherDataByLocation(latitude, longitude);
        const queryDuration = Date.now() - startTime;
        console.log(`Found ${allRecords.length} total records for this location in ${queryDuration}ms`);

        // Try current hour first, then previous hour
        let todayWeather = filterByHour(allRecords, currentHour);
        if (todayWeather.length === 0) {
            todayWeather = filterByHour(allRecords, previousHour);
        }

        // Sort by date descending to get most recent
        todayWeather.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });

        // Get last year's weather for same date
        const lastYear = new Date(today);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        const lastYearDateStr = formatDateForQuery(lastYear);

        const lastYearRecords = allRecords.filter(item => {
            if (!item.date) return false;
            const itemDateStr = formatDateForQuery(parseDate(item.date));
            return itemDateStr === lastYearDateStr;
        });

        // Sort last year records by date descending
        lastYearRecords.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });

        const response = {
            today: todayWeather[0] || null,
            lastYear: lastYearRecords[0] || null,
            latitude,
            longitude
        };
        console.log('Successfully fetched today weather data');
        res.json(response);
    } catch (error) {
        console.error('Error fetching today weather:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

/**
 * Get list of locations (cities)
 * Returns static list from scraper/helper/data.js - no DynamoDB scan needed
 */
app.get('/weather/locations', (req, res) => {
    try {
        console.log('GET /weather/locations - Request received');
        console.log(`Returning ${cities.length} cities from static list`);

        // Return cities in the expected format
        const locations = cities.map(city => ({
            name: city.name,
            lat: city.lat,
            lng: city.lng
        }));

        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

/**
 * Get past weather data with date filter
 */
app.get('/weather/past', async(req, res) => {
    try {
        const { latitude, longitude, date } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'latitude and longitude are required' });
        }

        // Get all records for this location using GSI Query
        const allRecords = await queryWeatherDataByLocation(latitude, longitude);

        let filteredRecords = allRecords;

        // If date is provided, filter by date
        if (date) {
            const targetDateStr = formatDateForQuery(new Date(date));
            filteredRecords = allRecords.filter(item => {
                if (!item.date) return false;
                const itemDateStr = formatDateForQuery(parseDate(item.date));
                return itemDateStr === targetDateStr;
            });
        }

        // Sort by date descending
        filteredRecords.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });

        res.json({
            data: filteredRecords,
            count: filteredRecords.length,
            latitude,
            longitude,
            date: date || 'all'
        });
    } catch (error) {
        console.error('Error fetching past weather:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

/**
 * Get yearly weather summary
 */
app.get('/weather/past/year', async(req, res) => {
    try {
        const { latitude, longitude, year } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'latitude and longitude are required' });
        }

        const targetYear = year ? parseInt(year) : new Date().getFullYear() - 1;

        // Get all records for this location using GSI Query
        const allRecords = await queryWeatherDataByLocation(latitude, longitude);

        // Filter by year
        const yearRecords = allRecords.filter(item => {
            if (!item.date) return false;
            const itemDate = parseDate(item.date);
            return itemDate.getFullYear() === targetYear;
        });

        // Group by month for summary
        const monthlyData = {};
        yearRecords.forEach(item => {
            const itemDate = parseDate(item.date);
            const month = itemDate.getMonth() + 1;
            if (!monthlyData[month]) {
                monthlyData[month] = [];
            }
            monthlyData[month].push(item);
        });

        // Calculate averages per month
        const summary = Object.keys(monthlyData).map(month => {
            const records = monthlyData[month];
            const temps = records
                .map(r => parseFloat(r.temp.replace(/[^0-9.-]/g, '')))
                .filter(t => !isNaN(t));
            const avgTemp = temps.length > 0 ?
                (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) :
                null;

            return {
                month: parseInt(month),
                recordCount: records.length,
                averageTemp: avgTemp,
                sampleDate: records[0].date || null
            };
        });

        res.json({
            year: targetYear,
            latitude,
            longitude,
            totalRecords: yearRecords.length,
            monthlySummary: summary
        });
    } catch (error) {
        console.error('Error fetching yearly weather:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    // Log event structure for debugging
    console.log('Lambda invoked with event:', {
        httpMethod: event.httpMethod,
        path: event.path,
        queryStringParameters: event.queryStringParameters
    });

    return awsServerlessExpress.proxy(server, event, context);
};