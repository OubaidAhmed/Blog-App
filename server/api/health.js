// health.js

export default async function handler(request, response) {
    try {
        // Your health check logic here
        return response.status(200).json({ status: "OK", message: "Serverless function is healthy" });
    } catch (error) {
        console.error("Error in the health check function:", error);
        return response.status(500).json({ error: "Something went wrong with the health check" });
    }
}
