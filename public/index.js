const { exec }  = require("child_process");

var inputImgFilePath = `/home/zach/Documents/Cheat-Music/romantic.png`;
var outputOMRFolderPath = `/home/zach/Documents/Cheat-Music`;
var cmdOption = " -o " + outputOMRFolderPath;
var neothesiaCommand = "/home/zach/Documents/Neothesia/target/release/neothesia-cli /home/zach/Documents/Cheat-Music/output.mid";

makeXML(inputImgFilePath);



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
