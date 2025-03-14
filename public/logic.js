/*
    GLORY BE TO GOD,
    SYNAPSEVISION - LOGIC,
    BY ISRAEL MAFABI EMMANUEL
*/

document.addEventListener('DOMContentLoaded', function () {
    console.log("debug: content loaded...");

    const upl_label    = document.getElementById('synapse-image-label');
    const img_label    = document.getElementById('synapse-image');
    const txt_label    = document.getElementById('synapse-text');

    const image_field  = document.getElementById('image-upload');
    const img_uploaded = document.getElementById('synapse-uploaded-image');

    const analyze_btn  = document.getElementById('analyze-btn');
    const search_btn   = document.getElementById('search-btn');

    const response     = document.getElementById('explainer-field');

    function typeWriter(html, element, speed) {
        let wrapper = document.createElement('div');
        wrapper.style.display = 'none'; // Hide the wrapper
        document.body.appendChild(wrapper); // Append to the body (temporarily)
        wrapper.innerHTML = html;

        let children = Array.from(wrapper.children);
        let currentChild = 0;
        let charIndex = 0;

        function nextChar() {
            if (currentChild < children.length) {
                let child = children[currentChild];
                if (charIndex < child.textContent.length) {
                    element.innerHTML += child.textContent.charAt(charIndex);
                    charIndex++;
                    setTimeout(nextChar, speed);
                } else {
                    currentChild++;
                    charIndex = 0;
                    if (currentChild < children.length) {
                        element.innerHTML += "<br>"; // Add a line break between elements
                    }
                    setTimeout(nextChar, speed);
                }
            } else {
                document.body.removeChild(wrapper); // Remove the wrapper
            }
        }

        element.innerHTML = ""; // Clear existing text
        nextChar();
    }

    function extractSearchQuery(responseText) {
        const queryMatch = responseText.match(/google_query:\s*\((.*?)\)\s*/i);
        if (queryMatch && queryMatch[1]) {
            let searchQuery = queryMatch[1].trim();
            searchQuery = searchQuery.replace(/"/g, ''); // Remove quotation marks
            return searchQuery;
        }
        return null;
    }

    search_btn.searchQuery = ""; // Initialize to an empty string

    analyze_btn.addEventListener('click', async function (event) {
        event.preventDefault();
        const image_file = image_field.files[0];
        if (image_file) {
            const formData = new FormData();
            formData.append('image', image_file);
            response.textContent = 'Analyzing...';

            search_btn.searchQuery = ""; // Reset the query here!

            try {
                const serverResponse = await fetch('http://localhost:3000/analyze', {
                    method: 'POST',
                    body: formData,
                });

                if (!serverResponse.ok) {
                    throw new Error(`HTTP error! status: ${serverResponse.status}`);
                }

                // const data = await serverResponse.json();
                // response.textContent = data.result;

                const data = await serverResponse.json();
                const markdownText = data.result;
                const htmlText = marked.parse(markdownText);
                // response.innerHTML = marked.parse(markdownText);

                typeWriter(htmlText, response, 7)

                const searchQuery = extractSearchQuery(data.result);
                search_btn.searchQuery = searchQuery || ""; // Set to query or empty string
                console.log(`debug: query[${searchQuery}]`); // for debugging purposes...
            } catch (error) {
                console.error('Error:', error);
                response.textContent = 'Error analyzing image.';
            }
        } else {
            response.textContent = 'Please upload an image first.';
        }
    });

    search_btn.addEventListener('click', function () {
        if (search_btn.searchQuery) { // Check if the query has a value
            // now we begin searching...
            const searchQuery = search_btn.searchQuery;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            window.open(searchUrl, '_blank');
        } else {
            alert('No search query available. Analyze an image first.');
        }
    });

    image_field.addEventListener('change', function (event) {
        const image_file = event.target.files[0];
        if (image_file) {
            if (image_file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    img_uploaded.src = e.target.result;
                    img_label.style.display = 'none';
                    txt_label.textContent = 'Change Image';
                    img_uploaded.style.display = 'block';
                    img_uploaded.classList.add('ready');
                    upl_label.classList.add('ready');
                };
                reader.readAsDataURL(image_file);
            } else {
                alert('Please select an image file.');
                image_field.value = '';
            }
        }
    });
});