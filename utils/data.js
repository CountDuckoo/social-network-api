const usernames = [
    "iambe214",
    "broke13259",
    "PrekNetty486",
    "Passgang273",
    "ponxo365",
    "Simeo175",
    "creciar208",
    "elblogerrante534",
    "zakasnela079",
    "Latosa594",
    "ikhala465",
    "elprofepedro222",
];

const emails = usernames.map(e => e + "@example.com");

const randomThoughts = [
    "Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie",
    "faucibus orci luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec",
    "ultricies ornare, elit elit fermentum risus, at fringilla",
    "non arcu. Vivamus sit amet risus. Donec egestas. Aliquam",
    "fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra",
    "a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et",
    "sociosqu ad litora torquent",
    "lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit",
    "eleifend vitae, erat. Vivamus nisi.",
    "pharetra nibh. Aliquam ornare, libero at auctor ullamcorper,",
    "ipsum nunc id enim. Curabitur",
    "condimentum. Donec at arcu. Vestibulum ante ipsum primis in",
    "mi, ac mattis velit justo nec",
    "vel quam dignissim pharetra. Nam ac nulla. In tincidunt",
    "ut eros non enim commodo hendrerit. Donec porttitor tellus non",
    "Nam nulla magna, malesuada vel, convallis in, cursus et, eros.",
    "netus et malesuada fames ac turpis egestas. Fusce aliquet magna",
    "semper cursus. Integer mollis.",
    "enim consequat purus. Maecenas libero est, congue",
    "Mauris vestibulum, neque sed dictum eleifend,",
    "ipsum porta elit, a feugiat tellus",
    "auctor, velit eget laoreet posuere, enim nisl elementum purus,",
    "Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam",
    "aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a,",
    "dui, semper et, lacinia vitae, sodales at,",
    "congue a, aliquet vel, vulputate",
    "tellus faucibus leo, in lobortis tellus",
    "ut eros non enim commodo hendrerit. Donec",
    "sapien. Cras dolor dolor, tempus non,",
    "orci lacus vestibulum lorem, sit amet ultricies",
];

const randomReactions = [
    "scelerisque neque sed sem egestas blandit. Nam nulla",
    "augue. Sed molestie. Sed id risus quis diam",
    "scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed,",
    "tellus id nunc interdum feugiat.",
    "vulputate dui, nec tempus mauris erat eget ipsum.",
    "sed tortor. Integer aliquam adipiscing lacus. Ut nec",
    "lorem, sit amet",
    "odio vel est tempor bibendum. Donec felis orci, adipiscing non,",
    "neque. In ornare sagittis felis. Donec tempor,",
    "dolor, tempus non, lacinia at, iaculis",
    "scelerisque neque sed sem egestas blandit. Nam nulla magna,",
    "Phasellus fermentum convallis ligula. Donec",
    "Aliquam tincidunt, nunc ac mattis",
    "convallis dolor. Quisque",
    "et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim",
    "lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis",
    "nec, eleifend non, dapibus",
    "dolor. Quisque tincidunt pede ac urna.",
    "sit amet risus. Donec egestas.",
    "elit sed consequat auctor, nunc nulla",
    "ante. Vivamus non lorem vitae odio sagittis semper. Nam",
    "magnis dis parturient montes,",
    "neque tellus, imperdiet non, vestibulum",
    "eu nulla at",
    "bibendum sed, est. Nunc laoreet lectus",
    "congue, elit sed consequat auctor, nunc",
    "fringilla euismod enim. Etiam gravida molestie arcu.",
    "ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor.",
    "Curae Phasellus ornare. Fusce mollis. Duis sit",
    "pede blandit congue. In",
    "Sed neque. Sed eget",
    "Phasellus ornare. Fusce mollis. Duis sit amet diam eu",
    "sociis natoque penatibus et magnis dis parturient montes,",
    "molestie tortor nibh sit",
    "sed pede nec ante blandit",
    "ac mattis semper, dui",
    "et libero. Proin mi. Aliquam gravida mauris",
    "Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh",
    "Suspendisse tristique neque venenatis lacus. Etiam bibendum",
    "in felis. Nulla tempor augue ac ipsum. Phasellus",
    "imperdiet nec, leo. Morbi",
    "Morbi metus. Vivamus euismod urna.",
    "Aenean sed pede nec ante blandit viverra.",
    "In lorem. Donec elementum, lorem ut aliquam iaculis, lacus",
    "consequat purus. Maecenas libero est, congue a, aliquet vel,",
    "ligula. Aenean euismod mauris",
    "et ultrices posuere cubilia",
    "nec, imperdiet nec,",
    "ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius.",
    "a mi fringilla mi lacinia",
];

getRandomArrayItem = function(array, excluded = -1){
    // if excluded>-1, then need to exclude it from the possible indicies
    let index;
    if(excluded>-1){
        // gets one less than the range
        index = Math.floor(Math.random()*(array.length-1));
        // if it is at or above the excluded index, increase by 1 to fill out the full range
        if (index >= excluded) index++;
    } else {
        index = Math.floor(Math.random()*(array.length));
    }
    // return the proper element from the array
    return array[index];
}

createThoughts = function(number, index){
    let results = [];
    for (let i=0; i<number; i++){
        results.push({
            thoughtText: getRandomArrayItem(randomThoughts),
            username: usernames[index],
            // create 1-3 reactions for each thought
            reactions: [...createReactions(Math.floor(Math.random()*3)+1, index)],
        });
    }
    return results;
}

createReactions = function(number, index){
    let results=[];
    for (let i=0; i<number; i++){
        results.push({
            reactionBody: getRandomArrayItem(randomReactions),
            // get a random username excluding the one who made the thought
            username: getRandomArrayItem(usernames, index),
        });
    }
    return results;
}

module.exports = {usernames, emails, createThoughts}