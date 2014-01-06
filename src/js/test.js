/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 05.01.14
 */

var _ = require('lodash');

var s = 'test-%s-test-%s-';

var result = s.search('%s');

function replacePattern(pattern, str, values, index) {
	if (index > values.length - 1) return str;
	var position = str.search(pattern);
	if (position != -1) {
		right = str.substring(0, position);
		left = str.substring(position + pattern.length);
		return right + values[index] + replacePattern(pattern, left, values, ++index) ;
	} 
	return str;	
}

console.log(replacePattern('%s', s, ['Значение', 'Другое', 123], 0));