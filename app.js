const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const stopBtn = document.querySelector('.stop'); 

let femaleVoice = null;

function setFemaleVoice() {
    const voices = window.speechSynthesis.getVoices();
    for (let voice of voices) {
        if (voice.name.includes("Female") || voice.lang.startsWith("en-") && voice.gender === "female") {
            femaleVoice = voice;
            break;
        }
    }
}

window.speechSynthesis.onvoiceschanged = function() {
    setFemaleVoice();
};

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = femaleVoice;
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning, HOW CAN I HELP YOU...")
    }

    else if(hour>12 && hour<18){
        speak("Good Afternoon, HOW CAN I HELP YOU...")
    }

    else{
        speak("Good Evenining, HOW CAN I HELP YOU...  ")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing Jason FOR EVERYONE..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if(message.includes(" whatsapp")) {
        window.open('Whatsapp:///')
        const finalText = "Opening whatsapp";
        speak(finalText);
    }



    else if (message.includes('play song')) {
       
        const songUrl = 'https://www.youtube.com/watch?v=YOUR_SONG_ID';
        window.open(songUrl);
        const finalText = "Playing your song";
        speak(finalText);
    } 

    

    else if (message.includes("play on spotify")) {
        const song = message.replace("play on spotify", "").trim();
        window.open(`https://open.spotify.com/search/${song}`, "_blank");
        speak(`Playing ${song} on Spotify...`);
    } else if (message.includes("open spotify")) {
        window.open("https://open.spotify.com", "_blank");
        speak("Opening Spotify...");
    } 
    


    
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);


    }

    

    

}









