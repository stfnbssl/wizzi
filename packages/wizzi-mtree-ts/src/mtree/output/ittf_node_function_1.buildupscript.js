// 22/12/2024:13:59:15  by C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\lib\loader\mTreeBuildUpScriptBuilder.js
$.n(); // set the context state to NodeContext
var $0 = {}; // the root node of the mTree buildUp
var $1 = { n: "ittf", v: "", i: 29, r: 1, c: 1, s: "f1", u: "f1",  }; //node:29
$.a($0, $1, 5);
$.s("f1");
function f_main_1($parent,alpha,calledBy,description) { //node:30
    $.n();
    var $3 = { n: "node_in_f_main_1", v: "", i: 34, r: 7, c: 9, s: "f1", u: "f1",  }; //node:34
    $.a($parent, $3, 10);
    var $4 = { n: "param", v: $.ip("f1", "alpha: ${JSON.stringify(alpha)}", "string", 11, false), i: 35, r: 8, c: 13, s: "f1", u: "f1",  }; //node:35
    $.a($3, $4, 12);
    var $5 = { n: "calledBy:", v: $.ip("f1", "${calledBy}", "string", 13, false), i: 36, r: 9, c: 13, s: "f1", u: "f1",  }; //node:36
    $.a($3, $5, 14);
    var $6 = { n: "description", v: $.ip("f1", "from caller: ${description}", "string", 15, false), i: 37, r: 10, c: 13, s: "f1", u: "f1",  }; //node:37
    $.a($3, $6, 16);
}
$.s("f1");
function f_main_2($parent,beta,calledBy,description) { //node:38
    $.n();
    var $8 = { n: "node_in_f_main_2", v: "", i: 42, r: 16, c: 9, s: "f1", u: "f1",  }; //node:42
    $.a($parent, $8, 22);
    var $9 = { n: "param", v: $.ip("f1", "alpha: ${JSON.stringify(beta)}", "string", 23, false), i: 43, r: 17, c: 13, s: "f1", u: "f1",  }; //node:43
    $.a($8, $9, 24);
    var $10 = { n: "calledBy:", v: $.ip("f1", "${calledBy}", "string", 25, false), i: 44, r: 18, c: 13, s: "f1", u: "f1",  }; //node:44
    $.a($8, $10, 26);
    var $11 = { n: "description", v: $.ip("f1", "from caller: ${description}", "string", 27, false), i: 45, r: 19, c: 13, s: "f1", u: "f1",  }; //node:45
    $.a($8, $11, 28);
    $.s("f1");
    f_main_1($8,beta,'f_main_2','The parameter received is used to call f_main_1'); //node:46
    $.s("f1");
}
$.s("f1");
f_main_2($1,10,'main','A parameter of value 10 is passed to f_main_2'); //node:50
$.s("f1");
$.n();
var $14 = { n: "before", v: "$include nf_1", i: 54, r: 31, c: 5, s: "f1", u: "f1",  }; //node:54
$.a($1, $14, 38);
$.s("f1");
function frag_nf_1_alpha($parent,alpha,calledBy,description) { //node:83
    $.n();
    var $16 = { n: "node_in_f_main_1", v: "", i: 87, r: 7, c: 9, s: "f1", u: "f2",  }; //node:87
    $.a($parent, $16, 43);
    var $17 = { n: "param", v: $.ip("f1", "alpha: ${JSON.stringify(alpha)}", "string", 44, false), i: 88, r: 8, c: 13, s: "f1", u: "f2",  }; //node:88
    $.a($16, $17, 45);
    var $18 = { n: "calledBy:", v: $.ip("f1", "${calledBy}", "string", 46, false), i: 89, r: 9, c: 13, s: "f1", u: "f2",  }; //node:89
    $.a($16, $18, 47);
    var $19 = { n: "description", v: $.ip("f1", "from caller: ${description}", "string", 48, false), i: 90, r: 10, c: 13, s: "f1", u: "f2",  }; //node:90
    $.a($16, $19, 49);
}
$.s("f1");
function frag_nf_1_beta($parent,beta,calledBy,description) { //node:91
    $.n();
    var $21 = { n: "node_in_f_main_2", v: "", i: 95, r: 16, c: 9, s: "f1", u: "f2",  }; //node:95
    $.a($parent, $21, 55);
    var $22 = { n: "param", v: $.ip("f1", "alpha: ${JSON.stringify(beta)}", "string", 56, false), i: 96, r: 17, c: 13, s: "f1", u: "f2",  }; //node:96
    $.a($21, $22, 57);
    var $23 = { n: "calledBy:", v: $.ip("f1", "${calledBy}", "string", 58, false), i: 97, r: 18, c: 13, s: "f1", u: "f2",  }; //node:97
    $.a($21, $23, 59);
    var $24 = { n: "description", v: $.ip("f1", "from caller: ${description}", "string", 60, false), i: 98, r: 19, c: 13, s: "f1", u: "f2",  }; //node:98
    $.a($21, $24, 61);
    $.s("f1");
    f_main_1($21,beta,'f_main_2','The parameter received is used to call frag_nf_1_alpha'); //node:99
    $.s("f1");
}
$.s("f1");
frag_nf_1_alpha($1,10,'frag_main_2','A parameter of value 10 is passed to frag_nf_1_beta'); //node:103
$.s("f1");
$.n();
var $27 = { n: "after", v: "$include nf_1", i: 56, r: 35, c: 5, s: "f1", u: "f1",  }; //node:56
$.a($1, $27, 71);