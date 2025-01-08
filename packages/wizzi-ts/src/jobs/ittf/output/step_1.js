/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-ts\src\jobs\ittf\ittf\lib\step_1.js.ittf
    utc time: Tue, 30 Apr 2024 05:27:13 GMT
*/
'use strict';
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var Animal = (function () {
    function Animal() {
        _classCallCheck(this, Animal);
    }
    Animal.prototype.sayHello = function() {
        console.log(this.cry, ', I am ', this.name);
    }
    return Animal;
})();

var horses = [
    'Ribot', 
    'Varenne'
];
var Horse = (function (Animal) {
    _inherits(Horse, Animal);
    function Horse(name) {
        _get(Object.getPrototypeOf(Horse.prototype), 'constructor', this).call(this);
        _classCallCheck(this, Horse);
        this.name = name;
        this.cry = 'Hiii';
    }
    return Horse;
})(Animal);

var horse = new Horse('Varenne');
horse.sayHello();
