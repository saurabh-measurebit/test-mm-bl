# BossLaser Event Monitoring with Google Cloud Dataform

This project implements event monitoring for BossLaser's Google Analytics data using Google Cloud Dataform. It replaces the previous Airflow-based monitoring system with a more serverless approach.

## Overview

The project monitors the following Google Analytics events for BossLaser:
- `quote_created`
- `session_start`
- `purchase`

It detects anomalies in event counts by comparing current data with historical averages, taking into account standard deviations and configurable thresholds.

## Project Structure

- `dataform.json`: Main configuration file for the Dataform project
- `definitions/`: Contains all SQL and JavaScript files
  - `bosslaser_config.js`: Client-specific configuration
  - `latest_partition.sqlx`: Gets the latest partition for GA data
  - `event_counts.sqlx`: Counts events for the latest partition
  - `event_anomalies.sqlx`: Detects anomalies based on historical data
  - `event_notifications.sqlx`: Creates notification records for anomalies

## How It Works

1. The workflow first identifies the latest partition in the GA data
2. It then counts events in that partition
3. Historical data is used to establish baseline averages and standard deviations
4. Anomalies are detected using configurable thresholds
5. Notification records are created for any anomalies

## Deployment

### Prerequisites

1. Install the Dataform CLI:
   ```
   npm install -g @dataform/cli
   ```

2. Authenticate with Google Cloud:
   ```
   gcloud auth application-default login
   ```

### Deployment Steps

1. Initialize the Dataform project:
   ```
   dataform init bigquery
   ```

2. Compile the project:
   ```
   dataform compile
   ```

3. Run the project:
   ```
   dataform run
   ```

### Setting Up Scheduled Execution

For production use, you should set up a scheduled execution using Google Cloud Dataform:

1. Create a Dataform repository in Google Cloud
2. Import this project into the repository
3. Create a workflow to run daily
4. Set up notifications using Pub/Sub or Cloud Functions to act on the `event_notifications` table

## Customization

To monitor different events or change thresholds:

1. Edit the `bosslaser_config.js` file
2. Update the event list and threshold values as needed

## Extending to Other Clients

To create monitoring for other clients:

1. Create a new config file (e.g., `client2_config.js`)
2. Copy and adapt the SQL files with the new client configuration
3. Update the Dataform workflow to include the new client's monitoring

## Advantages Over Airflow

- Serverless: No need to manage infrastructure
- Native BigQuery integration: More efficient data processing
- Version control: All transformations are in SQL/JS files
- Built-in scheduling: Easier to set up and maintain
- Cost-effective: Pay only for the queries you run
