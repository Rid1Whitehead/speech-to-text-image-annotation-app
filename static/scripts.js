var recognizing = false;
var recognition = null;

document.addEventListener('DOMContentLoaded', function() {
    var micButton = document.getElementById('mic-button');
    var nextImageButton = document.getElementById('next-image-button');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            recognizing = true;
            micButton.style.backgroundColor = '#5e5e5e';
            console.log('Voice recognition activated.');
        };

        recognition.onerror = function(event) {
            console.error(event.error);
        };

        recognition.onend = function() {
            if (recognizing) {
                recognition.start(); // Restart recognition if still recognizing
            } else {
                micButton.style.backgroundColor = '#3e3e3e';
                console.log('Voice recognition deactivated.');
            }
        };

        recognition.onresult = function(event) {
            var transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            processTranscript(transcript);
        };

        // Check if the microphone was previously on
        if (localStorage.getItem('micOn') === 'true') {
            recognition.start();
            recognizing = true;
            micButton.style.backgroundColor = '#5e5e5e';
            console.log('Voice recognition started automatically.');
        }

        micButton.addEventListener('click', function() {
            if (recognizing) {
                recognition.stop();
                recognizing = false;
                micButton.style.backgroundColor = '#3e3e3e';
                localStorage.setItem('micOn', 'false');
                console.log('Voice recognition stopped.');
            } else {
                recognition.start();
                recognizing = true;
                micButton.style.backgroundColor = '#5e5e5e';
                localStorage.setItem('micOn', 'true');
                console.log('Voice recognition started.');
            }
        });
    } else {
        micButton.disabled = true;
        console.warn('Speech Recognition API not supported.');
    }

    // Update label style on checkbox change
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var label = this.parentElement;
            if (this.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    });
});

function processTranscript(transcript) {
    transcript = transcript.toLowerCase().trim();
    console.log('Recognized: ' + transcript);

    // Split transcript into words
    var words = transcript.split(/\s+/);
    words.forEach(function(word) {
        if (word === 'next' || word === 'next image') {
            document.getElementById('annotation-form').submit();
            return;
        }

        categories.forEach(function(category) {
            if (word === category.toLowerCase()) {
                var checkbox = document.getElementById('category-' + category.toLowerCase());
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    var label = checkbox.parentElement;
                    if (checkbox.checked) {
                        label.classList.add('selected');
                    } else {
                        label.classList.remove('selected');
                    }
                }
            }
        });
    });
}
