$(document).ready(function(){
  $("ul").click(function(){
    $("div").removeClass("blue");
  });
});

function mark0() {
    var txt0 = $('body').text();
    var res0 = (txt0.match(/:\n\n/g) || []).length + '개';
    document.getElementById("navtext0").innerHTML = res0;
}

// a.text.textmark

function mark1() {
    var txt1 = $('ul').text();
    var res1 = (txt1.match(/\./g) || []).length + '개';
    document.getElementById("navtext1").innerHTML = res1;
}

$(document).ready(function() {
    $(".mark1").click(function() {
        $(".ptext1").toggleClass("blue");
    });
});

function mark2() {
    var txt2 = $('ul').text();
    var res2 = (txt2.match(/\,/g) || []).length + '개';
    document.getElementById("navtext2").innerHTML = res2;
}

$(document).ready(function() {
    $(".mark2").click(function() {
        $(".ptext2").toggleClass("blue");
    });
});

function mark3() {
    var txt3 = $('ul').text();
    var res3 = (txt3.match(/\?/g) || []).length + '개';
    document.getElementById("navtext3").innerHTML = res3;
}

$(document).ready(function() {
    $(".mark3").click(function() {
        $(".ptext3").toggleClass("blue");
    });
});

function mark4() {
    var txt4 = $('ul').text();
    var res4 = (txt4.match(/\!/g) || []).length + '개';
    document.getElementById("navtext4").innerHTML = res4;
}

$(document).ready(function() {
    $(".mark4").click(function() {
        $(".ptext4").toggleClass("blue");
    });
});

function mark5() {
    var txt5 = $('ul').text();
    var res5 = (txt5.match(/\//g) || []).length + '개';
    document.getElementById("navtext5").innerHTML = res5;
}

$(document).ready(function() {
    $(".mark5").click(function() {
        $(".ptext5").toggleClass("blue");
    });
});

function mark6() {
    var txt6 = $('ul').text();
    var res6 = (txt6.match(/\=/g) || []).length + '개';
    document.getElementById("navtext6").innerHTML = res6;
}

$(document).ready(function() {
    $(".mark6").click(function() {
        $(".ptext6").toggleClass("blue");
    });
});

function mark7() {
    var txt7 = $('ul').text();
    var res7 = (txt7.match(/\+/g) || []).length + '개';
    document.getElementById("navtext7").innerHTML = res7;
}

$(document).ready(function() {
    $(".mark7").click(function() {
        $(".ptext7").toggleClass("blue");
    });
});

function mark8() {
    var txt8 = $('ul').text();
    var res8 = (txt8.match(/\-/g) || []).length + '개';
    document.getElementById("navtext8").innerHTML = res8;
}

$(document).ready(function() {
    $(".mark8").click(function() {
        $(".ptext8").toggleClass("blue");
    });
});

function mark9() {
    var txt9 = $('ul').text();
    var res9 = (txt9.match(/\#/g) || []).length + '개';
    document.getElementById("navtext9").innerHTML = res9;
}

$(document).ready(function() {
    $(".mark9").click(function() {
        $(".ptext9").toggleClass("blue");
    });
});

function mark10() {
    var txt10 = $('ul').text();
    var res10 = (txt10.match(/\;/g) || []).length + '개';
    document.getElementById("navtext10").innerHTML = res10;
}

$(document).ready(function() {
    $(".mark10").click(function() {
        $(".ptext10").toggleClass("blue");
    });
});

function mark11() {
    var txt11 = $('ul').text();
    var res11 = (txt11.match(/\:/g) || []).length + '개';
    document.getElementById("navtext11").innerHTML = res11;
}

$(document).ready(function() {
    $(".mark11").click(function() {
        $(".ptext11").toggleClass("blue");
    });
});

function mark12() {
    var txt12 = $('ul').text();
    var res12 = (txt12.match(/\%/g) || []).length + '개';
    document.getElementById("navtext12").innerHTML = res12;
}

$(document).ready(function() {
    $(".mark12").click(function() {
        $(".ptext12").toggleClass("blue");
    });
});

function mark13() {
    var txt13 = $('ul').text();
    var res13 = (txt13.match(/\$/g) || []).length + '개';
    document.getElementById("navtext13").innerHTML = res13;
}

$(document).ready(function() {
    $(".mark13").click(function() {
        $(".ptext13").toggleClass("blue");
    });
});