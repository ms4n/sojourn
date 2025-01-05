require("dotenv").config();
const axios = require("axios");

class SearchService {
  constructor() {
    this.BASE_URL = "https://api.tavily.com/";
  }

  async performSearch(query, options = {}) {
    const {
      searchDepth = "advanced",
      includeImages = true,
      includeAnswer = true,
      includeImageDescriptions = true,
      includeRawContent = false,
      maxResults = 3,
      includeDomains = [],
      excludeDomains = [],
      imageQuery = "",
    } = options;

    // Use imageQuery as the main query if the primary query is empty
    const effectiveQuery = query || imageQuery;

    // Truncate the query to 400 characters (Tavily API limit)
    const truncatedQuery = effectiveQuery.slice(0, 400);

    const requestData = {
      api_key: process.env.TAVILY_API_KEY,
      query: truncatedQuery,
      search_depth: searchDepth,
      include_images: includeImages,
      include_answer: includeAnswer,
      include_image_descriptions: includeImageDescriptions,
      include_raw_content: includeRawContent,
      max_results: maxResults,
      include_domains: includeDomains,
      exclude_domains: excludeDomains,
    };

    try {
      const response = await axios.post(`${this.BASE_URL}search`, requestData);

      // Handle separate image query if provided
      if (imageQuery && imageQuery !== query) {
        const truncatedImageQuery = imageQuery.slice(0, 400);
        const imageRequestData = {
          ...requestData,
          query: truncatedImageQuery,
          include_images: true,
          include_image_descriptions: true,
          include_answer: false,
          max_results: 5,
        };
        const imageResponse = await axios.post(
          `${this.BASE_URL}search`,
          imageRequestData
        );
        response.data.image_results = imageResponse.data.images || [];
      } else {
        response.data.image_results = response.data.images || [];
      }

      return response.data;
    } catch (error) {
      console.error("Error performing search:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      return { answer: "No search relevant data found" };
    }
  }
}

// Test function to verify search functionality
async function testSearchService() {
  const searchService = new SearchService();

  console.log("Testing regular search...");
  try {
    const regularSearchResult = await searchService.performSearch(
      "What is artificial intelligence?"
    );
    console.log(
      "Regular search results:",
      JSON.stringify(regularSearchResult, null, 2)
    );
  } catch (error) {
    console.error("Regular search test failed:", error.message);
  }

  console.log("\nTesting image search...");
  try {
    const imageSearchResult = await searchService.performSearch("", {
      imageQuery: "beautiful landscape photography",
    });
    console.log(
      "Image search results:",
      JSON.stringify(imageSearchResult, null, 2)
    );
  } catch (error) {
    console.error("Image search test failed:", error.message);
  }
}

// Run the tests
testSearchService();

module.exports = new SearchService();
