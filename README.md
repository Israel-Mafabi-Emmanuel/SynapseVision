# SynapseVision: AI-Powered Image Analysis and Search

**SynapseVision** is a web application that leverages the power of AI to analyze uploaded images and provide detailed descriptions, along with suggested Google search queries for further exploration. It utilizes Google's Gemini API for image analysis and natural language processing, delivering an interactive and informative user experience.

## Features

* **Image Analysis:**
    * Upload an image, and SynapseVision will analyze its content.
    * Receive a detailed, human-friendly description of the image's key features and objects.
    * The response is formatted with Markdown for enhanced readability, including headers, bold text, and lists.
* **Intelligent Search Queries:**
    * SynapseVision generates relevant Google search queries based on the image analysis.
    * Easily search for more information about the identified objects with a single click.
* **Interactive Typewriter Effect:**
    * The analysis results are displayed with a smooth, character-by-character typewriter effect, enhancing the user experience.
* **User-Friendly Interface:**
    * Clean and intuitive design for seamless image uploading and analysis.

## How It Works

1.  **Image Upload:**
    * The user uploads an image through a simple file input.
2.  **Server-Side Analysis:**
    * The uploaded image is sent to a Node.js server running on `localhost:3000`.
    * The server uses the Google Gemini API to analyze the image and generate a descriptive response.
3.  **Client-Side Display:**
    * The server's response (in Markdown format) is sent back to the client-side JavaScript.
    * The markdown is converted to html.
    * The HTML is then rendered character by character to the user utilizing the typeWriter effect.
4.  **Search Query Extraction:**
    * The client-side JavaScript extracts the generated Google search query from the API response.
    * The query is sanitized to remove quotation marks and other potentially problematic characters.
5.  **Search Functionality:**
    * A "Search Online" button allows the user to open the generated Google search query in a new tab.

## Technologies Used

* **Client-Side:**
    * HTML, CSS, JavaScript
    * marked.js: Markdown to HTML conversion.
* **Server-Side:**
    * Node.js
    * Express.js
    * Google Gemini API.

## Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [repository_url]
    cd SynapseVision
    ```
2.  **Install Dependencies (Server-Side):**
    ```bash
    cd server
    npm install
    ```
3.  **Set Up Google Gemini API:**
    * Obtain an API key from the Google Gemini API.
    * Set the API key as an environment variable (`GOOGLE_API_KEY`) or add it directly into the server side code.
4.  **Run the Server:**
    ```bash
    node server.js
    ```
5.  **Open the Application:**
    * Open your web browser and navigate to `index.html`.

## Future Enhancements

* **Advanced Image Processing:** Implement more sophisticated image analysis techniques.
* **Real-Time Analysis:** Explore real-time image analysis from webcam or video streams.
* **Improved User Interface:** Enhance the UI/UX with more interactive elements and visual improvements.
* **Error Handling:** Implement more robust error handling and user feedback.
* **Cloud Deployment:** Deploy the application to a cloud platform for broader accessibility.
* **More API Integrations:** Integrate other AI APIs for enhanced functionality.
* **User Accounts:** Implement user accounts for saving image history.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Author

* Israel Mafabi Emmanuel, Glory be To God!!!

## License

This project is licensed under the [MIT License](LICENSE).