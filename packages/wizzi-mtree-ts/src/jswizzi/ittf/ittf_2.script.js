// 30/3/2024:4:56:16  by C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\lib\loader\mTreeBuildUpScriptBuilder.js
$.n(); // set the context state to NodeContext
var $0 = {}; // the root node of the mTree buildUp
var $1 = { n: "root", v: "", i: 19, r: 1, c: 1, s: "f1", u: "f1",  }; //node:19
$.a($0, $1, 5);
var $2 = { n: "node", v: "value1", i: 20, r: 2, c: 5, s: "f1", u: "f1",  }; //node:20
$.a($1, $2, 7);
$.s("f1");
function Sum(a, b) { //node:22
return a + b; //node:23
}  //node:24
$.n();
var $4 = { n: "node", v: $.ip("f1", "Sum ${Sum(2, 3)}", "string", 13, false), i: 25, r: 8, c: 5, s: "f1", u: "f1",  }; //node:25
$.a($1, $4, 14);
$.s("f1");
function alpha($parent,x) { //node:26
    $.n();
    var $6 = { n: "node", v: $.ip("f1", "alpha ${x}", "string", 18, false), i: 28, r: 12, c: 9, s: "f1", u: "f1",  }; //node:28
    $.a($parent, $6, 19);
    var $7 = { n: "f-node", v: "f-value1", i: 45, r: 2, c: 5, s: "f2", u: "f2",  }; //node:45
    $.a($parent, $7, 21);
    $.s("f2");
    function Subtract(a, b) { //node:47
    return a - b; //node:48
    }  //node:49
    $.n();
    var $9 = { n: "f-node", v: $.ip("f2", "Subtraction ${Subtract(5, 2)}", "string", 27, false), i: 50, r: 8, c: 5, s: "f2", u: "f2",  }; //node:50
    $.a($parent, $9, 28);
    $.s("f1");
    function beta($parent,x) { //node:30
        $.n();
        var $11 = { n: "node", v: $.ip("f1", "beta ${x}", "string", 32, false), i: 32, r: 17, c: 13, s: "f1", u: "f1",  }; //node:32
        $.a($parent, $11, 33);
    }
    $.s("f1");
    beta($parent,"holly"); //node:33
    $.s("f1");
}
$.s("f1");
alpha($1,"baby"); //node:35
$.s("f1");