function caesarCipher( str,shift){
    var chars = str.split("");
    for(var i=0;i<chars.length;i++){
    var charCode = chars[i].charCodeAt(0);//
    if(charCode>=65 && charCode<=90){ 
    charCode = ((charCode-65+shift)%26)+65;
    chars[i]=String.fromCharCode(charCode);
    }
    if(charCode>=97 && charCode<=122){ //ASCII values for small letters
    charCode = ((charCode-97+shift)%26)+97;
    chars[i]=String.fromCharCode(charCode);//
    }
    }
    return chars.join("");
    }
    console.log(caesarCipher("shital",3));

