# If I had more time to work on the application

There are several things I would do differently to improve its quality and efficiency. Below, I detail some of the tasks that I consider most important:

- Testing: Automated tests could not be included to ensure its proper functioning. If I had more time, I would like to add unit and integration tests that verify the functioning of each of the application's features.

- Migrations: Although a functional database could be created for the application, a production version could not be created. If I had more time, I would like to prepare the production database and add database migration functionality to facilitate the update process.

- Better code organization: The code could be organized more efficiently to facilitate its maintenance and scalability. If I had more time, I would like to refactor the code to separate the functionalities into smaller and easier to maintain modules.

- End-to-end testing: In addition to unit and integration testing, I would like to add end-to-end tests that simulate user behavior in the application. These tests would help detect possible integration issues between different parts of the application.

- User interface improvement: Although the application is functional, more work is needed on the user interface to make it more attractive and user-friendly. If I had more time, I would like to work on improving the user experience and add more visual elements to make the application more appealing.
- Improve the responsive ui

# Functionality of the Frontend Application

The application is a data analytics dashboard for visualizing and monitoring financial information related to asset pairs within a specified time period. The application is built using React and utilizes the Chart.js library for generating line charts. The application displays information such as the volume within a specified period, accumulated fees, and the adjusted Annual Percentage Rate (APR).

## Code Structure and Behavior

`LineChart`: This is the main component responsible for rendering the line chart using the Chart.js library and the react-chartjs-2 wrapper. The component receives the snapshotData and hours as properties and is responsible for constructing and rendering the chart.

`DashboardAnalytics`: This component is the main container that organizes and displays all the individual components on the page. It handles data querying using GraphQL, manages the application state, and displays the information in cards using the CardsInfo component and the line chart using the LineChart component.

`Card`: This is a presentation component that displays information in a card with a title and a value. It also handles transition animations when the value changes.

`CardsInfo`: This component is a container for multiple cards and displays relevant information for a specific time period. It uses the Card component to render the volume, fees, and APR information.

## Calculations and Formulas

The CardsInfo component is responsible for calculating and displaying the financial metrics based on the provided snapshotData. For each item in snapshotData, the following calculations are performed and accumulated:

`Volume`: The hourly USD volume (item.hourlyVolumeUSD) is added up and rounded to one decimal.

`Fees`: The accumulated fees for each hour (item.hourlyPairFees) are added up and rounded to one decimal.

`Reserves in USD`: The USD reserves for each hour (item.reserveUSD) are added up.

Once these values have been calculated and accumulated, the adjusted Annual Percentage Rate (APR) is calculated using the following formula:

`Adjusted APR = (Accumulated Fees / Reserves in USD) * 100 * Annualization Factor`

The annualization factor is calculated as (24 \* 365) / period, where period is the number of hours selected in the time range (e.g., 1, 12, or 24 hours).

## Line Chart

The LineChart component displays the Annual Percentage Rate (APR) per hour based on the selected time range. This line chart helps users visualize the APR over time and understand how this financial metric has varied within the selected time period.

The dataBuilder function is responsible for processing the snapshotData and constructing the data structure required for the line chart to display the APR per hour. Once the data has been processed, the LineChart component uses the Chart.js library and the react-chartjs-2 wrapper to render the line chart, showing the APR per hour based on the selected time range.

# Functionality and behavior of the SnapshotsService application (BACKEND )

## Description

The SnapshotsService application is a NestJS-based solution that is responsible for obtaining and storing data on cryptocurrency token pairs at regular time intervals (snapshots). It uses an external GraphQL API to obtain the data and stores it in a local database using TypeORM. Additionally, it allows users to retrieve snapshots based on certain criteria and update the protocol fee rate.

## Main functionalities:

- Module initialization: When starting the application, the "onModuleInit" method is executed, which is responsible for verifying if there are existing snapshots for the initial trading pairs in the database. If not, data from the last 48 hours is obtained and stored as snapshots in the database. If the data is not up-to-date, the missing data is obtained and stored in the database.

- Updating the protocol fee rate: The "updateProtocolFee" function allows updating the protocol fee rate if a valid administrator authorization is provided. This commission rate is used to calculate the fees per pair in each snapshot.

- Searching for snapshots by date range: The "findPairSnapshotsByDateRange" function allows users to search for snapshots for a specific pair address within a date range or retrieve the latest snapshots from the current date.

- Obtaining trading pair data from the last day: A cron job (getPairsInforLastHour) is used to obtain and store trading pair data every hour. This data is stored as new snapshots in the database.

## Internal behavior:

The application uses the GraphQLClientService module to interact with the external GraphQL API and obtain trading pair data.

The TypeORM library is used to interact with the database and store/retrieve information about trading pairs and snapshots.

## Main entities:

`Pair`: Represents a trading pair and contains information about the two cryptocurrencies that compose it (token0 and token1) and their address on the blockchain.

`SnapshotPairData`: Represents a snapshot of the trading pair data at a specific time, including token volumes, reserves, and fees.

The application uses a database with two main entities: Pair and SnapshotPairData. Both entities are related to each other through a one-to-many (OneToMany) relationship. Let's look in detail at how these entities are structured and how they relate.

## Pair Entity:

The Pair entity represents a token pair in a decentralized exchange. Each record in the Pair table contains the following information:

`id`: A unique and auto-incrementing identifier.

`address`: The smart contract address of the token pair on the blockchain.

`token0`: An object representing the first token of the pair, containing information such as the token's name and symbol.

`token1`: An object representing the second token of the pair, containing information such as the token's name and symbol.

`snapshotPairData`: A one-to-many relationship with the SnapshotPairData entity. This relationship indicates that a Pair can have multiple associated snapshot data records.

## SnapshotPairData Entity:

The SnapshotPairData entity represents a snapshot of a token pair's data at a specific time. Each record in the SnapshotPairData table contains the following information:
`id`: A unique and auto-incrementing identifier.

`pair`: A many-to-one relationship with the Pair entity. This relationship indicates that each SnapshotPairData record is associated with a single Pair.

`hourlyVolumeToken0`: The hourly trading volume of the first token in the pair.

`hourlyVolumeToken1`: The hourly trading volume of the second token in the pair.

`hourlyVolumeUSD`: The hourly trading volume in USD.

`reserve0`: The amount of reserves of the first token in the pair.

`reserve1`: The amount of reserves of the second token in the pair.
reserveUSD: The total value of reserves in USD.

`timestamp`: The timestamp when the snapshot was taken.

`hourlyPairFees`: The fees generated by the pair during the hour in which the snapshot was taken.

## Database relationships:

The `Pair` entity has a `one-to-many` relationship with the `SnapshotPairData` entity. This means that a pair can have multiple associated snapshot data records.
The `SnapshotPairData` entity has a `many-to-one` relationship with the `Pair entity`. This means that each snapshot data record is associated with a single token pair.
These relationships allow the application to query and store detailed information about token pairs and their data snapshots at a given time. Additionally, they facilitate the updating and retrieval of information from the pairs and their data snapshots as needed.
