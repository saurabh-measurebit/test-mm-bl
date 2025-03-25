module.exports = {
  // Client-specific configuration
  clientConfig: {
    client_id: "bosslaser",
    ga_property_id: "308825090",
    project_id: "measure-monitor",
    events_list: ["quote_created", "session_start", "purchase"],
    threshold_percentage: 25,
    std_dev_multiplier: 1.5,
    min_average: 10,
    // Event-specific configurations
    event_configs: {
      purchase: {
        threshold_percentage: 15,  // More sensitive for purchase events
        std_dev_multiplier: 2.0,
        min_average: 5
      },
      quote_created: {
        threshold_percentage: 20,
        std_dev_multiplier: 1.8,
        min_average: 8
      }
    }
  },
  
  // Dataset ID for GA data
  datasetId: "analytics_308825090"
};
