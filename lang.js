const fs = require("fs");
const inquirer = require("inquirer");

async function Print(args) {
    console.log(args.join(" "))
}

async function Input(args) {
    console.log((await (inquirer.prompt({
        type: "input",
        name: "i",
        message: args.join(" ")
    })))["i"])
}

const input = fs.readFileSync("something.alex_language").toString();


const commands = {
}

function AddCommand(command) {
    commands[command.name.toLowerCase()] = command
}
AddCommand(Print)
AddCommand(Input)

async function Execute(script) {
    let sentences = script.split('.');

    for (let i = 0; i < sentences.length; i++) {
        let words = sentences[i].split(' ');
        if (words.length > 1) {
            let command = commands[words[0].toLowerCase()];
            await command(words.slice(1, words.length));
        }
    }
}

Execute(input)