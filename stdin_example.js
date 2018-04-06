var stdin = process.stdin, stdout = process.stdout

console.log('please enter your name >');

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(data) {
  stdout.write(`so your name is ${data}`);
});
