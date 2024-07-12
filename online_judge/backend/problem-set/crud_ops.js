const User1 = require('./problemSchema.js');
const {DBConnection} = require('../database/db.js')

DBConnection();

User1.createProblem({
    tags:['two-pointer','array','greedy'],
    difficulty:500,
    problem_name:'Valid Palindrome',
    description:'Given a string s of length n, print 1 if it is a palindrome, or 0 otherwise. A palindrome is a word, phrase, or sequence that reads the same backwards as forwards, e.g. madam, tit, tat, malyalam etc.',
    value_constraints:['1 < n <= 10^5'],
    input_description:'The first line contains a single integer n - the length of string "s".The second line contains the string "s", consisting of only lowercase Latin letters.',
    output_description:'Print a single integer - 1 if palindrome else 0.',
    sampleTestCases:['5 madam','3 tit','6 abccbd','6 abccba','7 zzzzzzz'],
    outputOfSampleTestCases:['1','1','0','1','1'],
    hiddenTestCases:[' ','bastarddratsab'],
    outputOfHiddenTestCases:['1','1']
})

const run = async ()=>{
    const entry = await User1.findbyName('Valid Palindrome');
    //console.log(entry);
}

run();


