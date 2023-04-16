import synonyms from 'synonyms'
`const cocoSsd = require('@tensorflow-models/coco-ssd');
require('@tensorflow/tfjs-core'); /* or @tensorflow/tfjs-node */
require('@tensorflow/tfjs-backend-cpu');
const tf = require('@tensorflow/tfjs-node');`

function Connect() {
  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
  }

  async function getImage() {
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await model.detect(tf.node.decodeJpeg(img));

    console.log('Predictions: ');
    if (predictions.length > 0) {
        return predictions[0]["class"]
    }
    return "None";
}

  async function promptMe() {
    const cartoon_characters = ["Willy Wonka", "Dora the Explorer", "Caillou", "Peppa Pig", "Deku", "Bob the Builder", "Pablo the Penguin", "Kool-Aid Man", "Mickey Mouse", "Donald Duck", "Spongebob", "Patrick Star", "Squidward", "Elon Musk", "Winnie the Pooh", "Shrek", "WALL-E", "Jack the Ripper", "Ariel the Mermaid", "Snoopy", "Barbie", "Ferb", "Perry the Platypus", "Dr.Doofenshmirtz"]
    const locations = ["India", "Argentina", "China", "Sweden", "Bali", "South Africa", "Bangladesh", "Paris", "France", "Italy", "Germany", "Attack on Titan Universe", "Spongebob Universe", "Mickey Mouse Universe", "Cars 3 Universe", "Mars", "The Sun", "Pickle", "Table"]
    const animals = ["Penguin", "Puffin", "Fish", "Cow", "Dog", "Cat", "Goldfish", "Parakeet", "Parrot", "Rattlesnake", "Monkey", "Gorilla", "Teddy Bear", "Polar Bear", "Super Mario", "Donkey Kong", "Princess Peach", "Kirby", "The Ghostbusters"]
    const adjectives = ["flabbergasted", "happy", "jolly", "eager", "frustrated", "upset", "tired", "awesome", "fantastic", "yummy", "sad", "stressed", "purple", "vibrant", "angry", "cheery", "muscular"]
    const verbs = ["chasing", "running from", "slaying", "rowing", "winning against", "dancing with", "singing with", "yelling at", "tickling", "holding", "cheering for", "running torwards", "high-fiving", "slapping"]
    const artists = ["Nancy Min Zhang", "Van Gogh", "Monet", "Picasso", "Georgie O Keef", "Dali", "Michealanglo"]
    
    var noun1 = document.getElementById('Noun1').value
    var noun2 = document.getElementById('Noun2').value
    var adjective = document.getElementById('Adjective').value
    var location = document.getElementById('Verb').value
    var verb = document.getElementById('Location').value
    var style = document.getElementById('Artist').value


    if (location == "") {
      location = getRandomItem(locations);
    }

    if (adjective == "") {
        adjective = getRandomItem(adjectives);
    }
    if ((synonyms(adjective, "s") === undefined) == false) {
        adjective = getRandomItem(synonyms(adjective, "s"))
    }


    if (noun1 == "") {
        noun1 = getRandomItem(cartoon_characters)
    } else {
        if ((synonyms(noun1, "n") === undefined) == false) {
            noun1 = getRandomItem(synonyms(noun1, "n"))
        }
    }
    if (document.getElementById('file-upload').files.length > 0) {
      //noun1 = await getImage();
      noun1 = "penguin"
    }


    if (noun2 == "") {
        noun2 = getRandomItem(animals);
    } else {
        if ((synonyms(noun2, "n").length === undefined) == false) {
            noun2 = getRandomItem(synonyms(noun2, "n"))
        }
    }

    if (verb == "") {
        verb = getRandomItem(verbs);
    }
    if (style == "") {
        style = getRandomItem(artists);
    }
    window.alert("Your Prompt is: " + noun1 + " " + verb + " a " + adjective + " " + noun2 + " in " + location + " in the style of " + style)
    //document.getElementById('prompt').innerHTML = "Your Prompt is: " + noun1 + " " + verb + " a " + adjective + " " + noun2 + " in " + location + " in the style of " + style;

    console.log(noun1 + " " + verb + " a " + adjective + " " + noun2 + " in " + location + " in the style of " + style);

  }

  return (
    <><input type="text" id="Noun1" placeholder="Noun #1"/>
    <input type="text" id="Noun2" placeholder="Noun #2"/>
    <input type="text" id="Adjective" placeholder="Adjective"/>
    <input type="text" id="Verb" placeholder="Verb(-ing)"/>
    <input type="text" id="Location" placeholder="Location"/>
    <input type="text" id="Artist" placeholder="Artist"/>
    <input type="file" id="file-upload"/>
    <button onClick={promptMe}>Give me a prompt!</button>
    <button href={'https://labs.openai.com/'}>Take me to DALL-E!</button></>
  );
}

export default Connect;