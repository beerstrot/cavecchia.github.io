// beerstrot-prod:
const url = 'https://6nw3zi6sbkph6dledhd4op3mvq0aaduw.lambda-url.eu-central-1.on.aws/';
// const url = 'http://localhost:5002/entry';
let pCount = 0;
function mkCall(type, data, success, error) {
  if (!['POST', 'GET'].includes(type)) return console.log(`this ajax method is not good: ${type}`);
  const set = {
    crossDomain: true,
    url,
    type,
    data,
    success,
    error,
    beforeSend: () => {
      pCount++;
      $('#loading').show();
    },
    complete: () => {
      if (--pCount === 0)
        $('#loading').hide();
    }
  };
  if (type === 'POST') {
    set.data = JSON.stringify(set.data);
    if (url.split('/').reverse()[0] === 'entry') {
      set.contentType = 'application/json; charset=utf-8';
    }
  }
  $.ajax(set);
}

function testeLambdaPOST () {
  mkCall(
    'POST',
    { action: 'test', data: { hey: 'man', nums: [5, 6, 7], jac: { 33: 44, l: ['asd', 'ewq', 66] } } },
    res => console.log('POST success:', res),
    res => console.log('POST error:', res),
  );
}

function testeLambdaGET () {
  mkCall(
    'GET',
    { action: 'test', data: 'a get arg' },
    res => console.log('GET success:', res),
    res => console.log('GET error:', res),
  );
}

function testeLambda () {
  testeLambdaGET();
  testeLambdaPOST();
}

function formatNum (num) {
  // return num.toLocaleString(undefined, { minimumFractionDigits: 2 })
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const foo = window.location.href.split('/');
const ORIGIN = foo.slice(0, foo.length - 1).join('/');

const bana = 55;
export { bana, mkCall, testeLambdaPOST, testeLambdaGET, testeLambda, formatNum, ORIGIN };
