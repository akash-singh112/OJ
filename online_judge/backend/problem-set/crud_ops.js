const User = require('./problemSchema.js');
const {DBConnectionProblemSet} = require('./problem_server.js');

DBConnectionProblemSet();

// User.createProblem({
//     tags:['math','combinatorics','number-theory'],
//     difficulty:1400,
//     problem_name:'Coin Combinations 69',
//     description:'Let D(n) represent the sum of digits of n. For how many integers n where 10^l ≤ n < 10^r satisfy D(k⋅n)=k⋅D(n)? Output the answer modulo 10^9+7',
//     constraints:{
//         time_limit_per_test:'1s',
//         space_limit_per_test:'64MB',
//         value_constraints:['0 <= l <= 10^9','0 <= r <= 10^9',' 1 <= k <= 10^9',' l < r ']
//     },
//     input_description:'Each test case contains three integers l, r, and k.',
//     output_description:'Print one integer: answer modulo 10^9+7.',
//     sampleTestCases:['0 1 4','0 2 7','1 2 1','1 2 3','582 74663 3','0 3 1'],
//     outputOfSampleTestCases:['2','3','90','12','974995667','999'],
//     hiddenTestCases:['0 1 1 ','0 1 2','0 1 3','0 1 4','0 1 5','0 1 6','0 1 7','167959138 245485584 642802746','740396294 877385394 6','503722502 981764048 5','268792717 557973769 4','125908042 655293904 3','150414368 213261024 7','856168101 912335599 6'],
//     outputOfHiddenTestCases:['9','4','3','2','1','1','1','0','13041959','899062854','462839189','870241350','808222805','3513308']
// })

// const run = async ()=>{
//     const entry = await User.findbyName('Counting Rooms');
//     console.log(entry);
// }

// run();


