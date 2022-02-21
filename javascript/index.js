function generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

alert(generatePassword(12));
var Password = {

    _pattern: /[a-zA-Z0-9_\-\+\.]/,


    _getRandomByte: function() {
        // http://caniuse.com/#feat=getrandomvalues
        if (window.crypto && window.crypto.getRandomValues) {
            var result = new Uint8Array(1);
            window.crypto.getRandomValues(result);
            return result[0];
        } else if (window.msCrypto && window.msCrypto.getRandomValues) {
            var result = new Uint8Array(1);
            window.msCrypto.getRandomValues(result);
            return result[0];
        } else {
            return Math.floor(Math.random() * 256);
        }
    },

    generate: function(length) {
        return Array.apply(null, { 'length': length })
            .map(function() {
                var result;
                while (true) {
                    result = String.fromCharCode(this._getRandomByte());
                    if (this._pattern.test(result)) {
                        return result;
                    }
                }
            }, this)
            .join('');
    }

};
const password_ele = document.getElementById("pwd_txt");
var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789";
const special_chars = "@#$%^&*";
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
var pwd_length = document.getElementById("slider");


generate.addEventListener('click', () => {
    let password = "";
    var checked = document.getElementById("checkbox").checked;
    var final_string = string;
    console.log(checked);
    if (checked) {
        final_string += "@#$%^&*";
    }
    for (var i = 0; i < pwd_length.value; i++) {
        let pwd = final_string[Math.floor(Math.random() * final_string.length)];
        password += pwd;
    }
    password_ele.innerText = password;
    final_string = string;
});


clipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(password_ele.innerText);
    alert("Password copied to clipboard");
});