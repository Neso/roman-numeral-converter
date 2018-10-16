var decades = [
    {
        first: "I",
        mid: "V",
        next: "X"
    },
    {
        first: "X",
        mid: "L",
        next: "C"
    },
    {
        first: "C",
        mid: "D",
        next: "M"
    },
    {
        first: "M",
        mid: "c̅",
        next: "x̅"
    }
];

function Number2Roman(number) {
    if (number === 0) {
        return "nulla";
    }

    var input = String(number);
    var output = "";

    var decade = 0;

    for (var num = input.length - 1; num >= 0; num--) {
        var n = input[num];

        var d = decades[decade];

        output = handleSingle(Number(n), d.first, d.mid, d.next) + output;

        decade++;
    }

    return output;
}

function Roman2Number(roman) {
    var decade = 0;
    var value = 0;
    var result = "";

    for (var i = roman.length - 1; i >= 0; i--) {
        var obj = roman[i];
        var d = decades[decade];

        // console.log("a", obj);

        if (obj === d.first) {
            // console.log("first", obj);
            value++;
        } else if (obj === d.mid) {
            // console.log("mid", obj);
            if (value > 0) {
                value += Math.pow(10, decade) * 5;
            } else {
                if (roman[i - 1] === d.first) {
                    value = 4;
                    i--;
                } else {
                    value = 5;
                }
            }
        } else if (obj === d.next) {
            // console.log("next", obj);
            if (roman[i - 1] === d.first) {
                value = 9;
                i--;
            } else {
                i++;
                d++;
                result += String(value);
            }
        }
    }

    if (value > 0) {
        result += String(value);
    }

    return Number(result);
}

function handleSingle(num, one, mid, end) {
    var out = "";

    if (num === 0) {
        return out;
    }

    if (num === 9) {
        out = one + end;
    } else if (num / 5 >= 1) {
        num = num - 5;
        out = mid;
        out += generateNumber(num, one);
    } else if (num === 4) {
        out = one + mid;
    } else {
        out = generateNumber(num, one);
    }

    return out;
}

function generateNumber(num, code) {
    var out = "";

    for (var i = 0; i < num; i++) {
        out += code;
    }

    return out;
}
