# Image Annotation App with Speech Recognition

This is a Flask-based web application for annotating images using speech recognition. The app allows users to annotate images from a specified directory by selecting categories via voice commands or by clicking buttons. Annotations are saved in an Excel file (`annotations.xlsx`) with a binary representation (`1` for selected categories, `0` for unselected).

## Features

- **Speech Recognition**: Use voice commands to select categories and navigate between images.
- **Persistent Microphone**: The microphone stays active across images until manually turned off.
- **Uniform Image Display**: Images are displayed at a consistent size to prevent layout shifts.
- **Annotations Saving**: Annotations are saved in an Excel file with a binary representation.
- **Session Persistence**: The app skips already annotated images, allowing you to continue where you left off.

## Prerequisites

- **Python 3.6+**
- **pip** (Python package installer)
- **Web Browser**: Google Chrome is recommended for optimal speech recognition support.

## Installation

1. **Clone the Repository** 
2. **Create a Virtual Environment (Optional but Recommended)**
        
    `` python -m venv venv source venv/bin/activate  # On Windows use `venv\Scripts\activate` ``
    
3. **Install Dependencies**
       
    `pip install -r requirements.txt`
    

## Directory Structure

`image-annotation-app/ ├── app.py ├── annotations.xlsx  # Created automatically after first annotation ├── requirements.txt ├── README.md ├── templates/ │   ├── index.html │   ├── annotate.html │   └── finished.html └── static/     ├── styles.css     └── scripts.js`

## Usage

1. **Prepare Your Images**
    
    - Place all the images you want to annotate in a directory on your local system.
    - Supported image formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`
2. **Run the Application**
    
    `python app.py`
    
    The app will start running on `http://localhost:5000`.
    
3. **Access the App**
    
    - Open your web browser and navigate to `http://localhost:5000`.
4. **Start Annotating**
    
    - **Step 1**: Enter the directory path where your images are located.
        - Use an absolute path or ensure the path is correct relative to `app.py`.
    - **Step 2**: Enter the categories you want to use for annotation, separated by commas (e.g., `Dog, Cat, Bird`).
    - **Step 3**: Click **Submit** to start annotating.
5. **Annotation Interface**
    
    - **Image Display**: The app will display images one at a time.
    - **Category Selection**:
        - **Voice Commands**: Click the microphone button (🎤) to activate speech recognition.
            - Say the category names to toggle their selection (e.g., "dog", "cat").
            - Say "next" or "next image" to save the current annotations and proceed to the next image.
            - The microphone stays active across images until you click the microphone button again to turn it off.
        - **Manual Selection**: Alternatively, click on the category buttons to select/deselect them.
    - **Proceeding to Next Image**:
        - Click the **Next Image** button or use the voice command "next image".
6. **Completing Annotation**
    
    - After all images have been annotated, a message will display: "All images are annotated. Thank you!"

## Annotations File

- The annotations are saved in `annotations.xlsx` in the root directory.
- The file contains:
    - **Column A**: Image filenames.
    - **Columns B onward**: Categories with binary values:
        - `'1'` indicates the category was selected.
        - `'0'` indicates the category was not selected.

## Resuming Annotation

- If you close the app or stop the server, your progress is saved in `annotations.xlsx`.
- Restarting the app and entering the same directory and categories will allow you to continue where you left off.
- The app skips images that have already been annotated.

## Customization

- **Adjusting Image Size**: Modify `max-width` and `max-height` in `static/styles.css` under the `#image` selector to change the displayed image size.
- **Changing Speech Recognition Language**: In `static/scripts.js`, change `recognition.lang = 'en-US';` to your desired language code.

## Troubleshooting

- **Microphone Not Working**:
    - Ensure your browser has permission to access the microphone.
    - The Web Speech API is best supported in Google Chrome.
- **Speech Recognition Not Accurate**:
    - Speak clearly and ensure background noise is minimized.
    - Check that your microphone is functioning properly.
- **Invalid Directory Error**:
    - Ensure the directory path is correct and accessible.
    - Use absolute paths to avoid confusion.

## Dependencies

- **Flask**: Web framework for Python.
- **openpyxl**: Library to read/write Excel files.
- **SpeechRecognition API**: Implemented in JavaScript via the Web Speech API (no additional installation needed).

## Requirements File

See `requirements.txt` for the list of Python dependencies.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for efficient image annotation tools.
- Utilizes the Web Speech API for speech recognition functionality.
