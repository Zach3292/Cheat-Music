const { exec }  = require("child_process");
const { xml2json } = require("xml-js");
const fs = require("fs");

var inputImgFilePath = `C:\\Users\\Zach\\Downloads\\romantic.png`;
var outputOMRFolderPath = `C:\\Users\\Zach\\Documents\\École\\Entreprenariat\\Cheat-Music-Code`;
var cmdOption = " -o " + outputOMRFolderPath;


//makeXML(inputImgFilePath);
//convertXML2MIDI("C:\\Users\\Zach\\Documents\\École\\Entreprenariat\\Cheat-Music-Code\\romantic.musicxml", "C:\\Users\\Zach\\Documents\\École\\Entreprenariat\\Cheat-Music-Code\\output.mid");


// il faut que le programme exécute makeXML() qui prend beaucoup de temps à fonctionner, attendre que runCLICommand() soit fini
// et ensuite faire la meme chose avec convertXML2MIDI alors attendre que la fonction soit fini et que runCLICOmmand soit fini





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

    let command =  "oemer" + cmdOption +  " " + inputImgPath;
    runCLICommand(command);
    
}

function convertXML2MIDI(pathsToXml, pathsToMidi){

    let commandXML2MIDI = `"C:\\Program Files\\MuseScore 3\\bin\\MuseScore3.exe" ` + pathsToXml + " -o " + pathsToMidi;
    runCLICommand(commandXML2MIDI);
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
