const { exec }  = require("child_process");
const { xml2json } = require("xml-js");
const fs = require("fs");

var inputImgFilePath = `/home/zach/Documents/Cheat-Music/romantic.png`;
var outputOMRFolderPath = `/home/zach/Documents/Cheat-Music`;
var cmdOption = " -o " + outputOMRFolderPath;
var neothesiaCommand = "/home/zach/Documents/Neothesia/target/release/neothesia-cli output.mid";


makeXML(inputImgFilePath);



//getNotesData();

function getNotesData(){

    var xml = fs.readFileSync("romantic.musicxml");

    var json = xml2json(xml, {compact: true});
    var parsedJSON = JSON.parse(json);


    var measureData = parsedJSON["score-partwise"].part.measure;
    var partNumber = parsedJSON["score-partwise"].part._attributes.id;

    var allNotes = [];


    /*
        programme fonctionne seulemement avec une part/instrument/main et
        moyennement avec les dièses, bemol etc
    */
    

    for (let index = 1; index < measureData.length; index++) {
        
        if (measureData[index].note.length != undefined) {

            for (let i = 0; i < measureData[index].note.length; i++) {
                var noteString = measureData[index].note[i].pitch.step._text + "/" + 
                    measureData[index].note[i].pitch.alter._text + "/" + 
                    measureData[index].note[i].pitch.octave._text + "/" + 
                    measureData[index].note[i].duration._text;

                allNotes.push(noteString);
    
            }
        } else {
            var oneNoteData = measureData[index].note.pitch.step._text + "/" + 
                measureData[index].note.pitch.alter._text + "/" + 
                measureData[index].note.pitch.octave._text + "/" + 
                measureData[index].note.duration._text;

            allNotes.push(oneNoteData);
            }
    }
    

}

function makeXML(inputImgPath) {
    console.log("make XML");
    let command =  "python3 /home/zach/.local/lib/python3.8/site-packages/oemer/ete.py" + cmdOption +  " " + inputImgPath;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            //return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            //return;
        }
        console.log(`stdout: ${stdout}`); //printed
        console.log("done making XML file"); //never printed
        convertXML2MIDI("/home/zach/Documents/Cheat-Music/romantic.musicxml", "/home/zach/Documents/Cheat-Music/output.mid");
    });
    
}

function encodeVideo() {
    console.log("making video");
    exec(neothesiaCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            //return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            //return;
        }
        console.log(`stdout: ${stdout}`); //printed
        console.log("done making video"); //never printed
        testFinished();
    });
    
}

function testFinished(){
    console.log("finished");
}

function convertXML2MIDI(pathsToXml, pathsToMidi){
    console.log("XML 2 MIDI");
    let command = `"musescore3" ` + pathsToXml + " -o " + pathsToMidi;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            //return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            //return;
        }
        console.log(`stdout: ${stdout}`);
        encodeVideo();
    });
}

function runCLICommand(command){

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
