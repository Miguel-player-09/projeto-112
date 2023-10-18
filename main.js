Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90

});


camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iFYDehw6P/model.json' , modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        /*document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;*/

        document.getElementById("result_object_name").innerHTML = results[0].label;
        toSpeak = "";
        
        if(results[0].label == "perfeito")
        {
            toSpeak = "Isso parece perfeito!";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        }
        if(results[0].label == "joinha")
        {
             toSpeak = "Isso parece joinha!";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }
        if(results[0].label == "vitória")
        {
             toSpeak = "Isso parece vitória!";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }

        /*repetido
        if(results[1].label == "perfeito")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "joinha")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "vitória")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#9996;";
        }
        */

        speak();
    }

}

function speak(){
    var synth = window.speechSynthesis;
    /*speakData1 = "A primeira previsão é " + prediction1;
    speakData1 = "E a primeira previsão é " + prediction2;
    var uttherThis = new SpeechSynthesisUtterance(speakData1 + speakData2);*/
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    
    synth.speak(utterThis);
}



