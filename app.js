const exported_object_of_that_file = require('./logs');

const { _e, _s, _ } = exported_object_of_that_file;

console.log(module); //` (global) module object with all the properties and methods of the module

_e('I am an error');
_s('I am a success');
_('I am a message');
