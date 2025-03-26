/**
 * Dummy connection function - replaces MongoDB connection
 * This application now uses in-memory data storage
 */
async function dbConnect() {
  // No database connection needed
  return;
}

export default dbConnect; 