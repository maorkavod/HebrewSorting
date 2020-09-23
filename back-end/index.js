exports.handler = async (event) => {

  const letters_order = ['a','b','g','d','h','v','z','j','t','y','k','l','m','n','s','i','p','x','q','r','w','u','c','e','f','o'];

  // a custom comparator for comparing words by hebrew order
  function hebrewComparator(a, b) {
    // same string
    if (a === b) {
      return 0;
    }

    // a is a prefix of b, b is the winner
    if (a.length === 0) {
      return -1;
    }

    // b is a prefix of a, a is the winner
    if (b.length === 0) {
      return 1;
    }

    // compare the first letter of a vs. the first letter of b
    let result = letters_order.indexOf(a[0].toLowerCase()) - letters_order.indexOf(b[0].toLowerCase());

    // they are not the same? return the comparison result
    if (result) {
      return result;
    }

    // they are the same? continue with the rest of the word
    return hebrewComparator(a.slice(1), b.slice(1));
  }

  // a wrapper for JSON.parse method, return false instead of exception
  function parseJson(obj) {
    try {
        return JSON.parse(obj);
    } catch (e) {
        return false;
    }
  }

  // return a standard error response
  function formatErrorResponse(msg) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" },
      body: JSON.stringify({ 'err': msg })
    }; 
  }

  // return a standard valid response
  function formatValidResponse(output) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" },
      body: JSON.stringify({ 'output': output })
    };
  }

  // extract and validate the input
  const body = event && event.body && parseJson(event.body);
  if (!body) {
    return formatErrorResponse('invalid_request_body_err');
  }
  const input = body.input;
  if (!input) {
    return formatErrorResponse('missing_input_err');
  }
  if (typeof input !== 'string') {
    return formatErrorResponse('invalid_input_err');
  }

  // sort the input and return the result
  const sorted_text = input.replace(/[^A-Za-z\s]/g, '').split(' ').sort(hebrewComparator).join(' ').trim();
  return formatValidResponse(sorted_text);
};