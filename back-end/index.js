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

  // get and validate the input
  const input = event['input'];
  if (!input || typeof input !== 'string') {
    return { statusCode: 400, body: 'invalid_input_validation_err' }
  }

  // sort the input and return the result
  const sorted_text = input.replace(/[^A-Za-z\s]/g, '').split(' ').sort(hebrewComparator).join(' ').trim();
  return { statusCode: 200, body: sorted_text };
};