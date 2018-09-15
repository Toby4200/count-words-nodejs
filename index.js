const fs = require('fs');
const recursive = require("recursive-readdir");
// count different words
// outside of comment
// in each file recursively on file tree
// 
let objToSaveWords = {};

// Count different words
recursive('./sources-to-count', function (err, files) {
  // `files` is an array of file paths
  console.log(files);
  files.forEach((name, i, arr) => {
        // get file
        const file = fs.readFileSync(name, { encoding: 'utf-8'});
        // console.log('file', file);

        const wordsObj = countWords(file);
        debugger;
        console.log('wordsObj', wordsObj);
        objToSaveWords = sumObjectsByKey(objToSaveWords, wordsObj);
  });

  console.log('objToSaveWords', objToSaveWords);
});


function countWords(string) {

    /* Below is a regular expression that finds alphanumeric characters
        Next is a string that could easily be replaced with a reference to a form control
        Lastly, we have an array that will hold any words matching our pattern */
        // words
        const wordsPattern = /\w+/g;
        // regexp for JavaScript comments
        const commentsPattern = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
        fileWithoutComments = string.replace( commentsPattern, '' );
        matchedWords = fileWithoutComments.match( wordsPattern );

    /* The Array.prototype.reduce method assists us in producing a single value from an
       array. In this case, we're going to use it to output an object with results. */
    var counts = matchedWords.reduce(function ( stats, word ) {
        console.log('stats', stats);
        /* `stats` is the object that we'll be building up over time.
           `word` is each individual entry in the `matchedWords` array */
        if ( Object.prototype.hasOwnProperty.call(stats, word ) ) {
            /* `stats` already has an entry for the current `word`.
               As a result, let's increment the count for that `word`. */
            stats[ word + '_' ] = stats[ word ] + 1;
        } else {
            /* `stats` does not yet have an entry for the current `word`.
               As a result, let's add a new entry, and set count to 1. */
            stats[ word + '_' ] = 1;
        }

        /* Because we are building up `stats` over numerous iterations,
           we need to return it for the next pass to modify it. */
        return stats;

    }, {} );

    /* Now that `counts` has our object, we can log it. */
    // console.log( counts );
    return counts;
};

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (Object.prototype.hasOwnProperty.call(b, k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}

