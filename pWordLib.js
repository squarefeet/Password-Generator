var pWordLib = {};

pWordLib.dictionary = {

    lowercase:      ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    uppercase:      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    numbers:        ['1','2','3','4','5','6','7','8','9','0'],
    symbolsSimple:  ['[',']',';','\'','\\',',','.','/'],
    symbolsComplex: ['!','@','\u00A3;','$','%','^','&','*','(',')']

};

pWordLib.options = {
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbolsSimple: false,
    symbolsComplex: false,
    length: 10,
    words: true,
    overflow: true  
};


pWordLib.domElements = {
	lowercase: null,
	uppercase: null,
	numbers: null,
	symbolsSimple: null,
	symbolsComplex: null,
	len: null,
	words: null,
	overflow: null
};

pWordLib.makeRandom = function(limit) {
    return Math.floor(Math.random() * limit);
};

pWordLib.create = function(options) {
    
    var i, len = pWordLib.options.length,
        rand,
        pword = [],
        numTypes = [],
        dictionary = pWordLib.dictionary,
		hasOptions = false;
    
    if(options) {
        for(i in options) {
            pWordLib.options[i] = options[i];
        }
    }

    for(i in pWordLib.options) {
        if(pWordLib.options[i] === true && i !== 'overflow') {
            numTypes.push(i);
        }
    }
	
	if(!numTypes.length) return;
	
    for(i = 0; i < len; i=i) {
        
        bigRand = pWordLib.makeRandom(numTypes.length);
        
        if(pWordLib.options[numTypes[bigRand]]) {
            rand = pWordLib.makeRandom( dictionary[numTypes[bigRand]].length );
            pword.push( dictionary[numTypes[bigRand]][rand] );
            i += dictionary[numTypes[bigRand]][rand].length;
            if(i >= pWordLib.options.length) {
                break;
            }
        }
        
    }
    
    pword = pword.join('');
    
    if(!pWordLib.options.overflow) {
        pword = pword.substr(0, pWordLib.options.length);
    }
    
	console.log(pword);

    document.getElementById('result').value = pword;
    
};

pWordLib.setOptions = function() {
	var elements = pWordLib.domElements,
		options = pWordLib.options;
	
	if(!elements.lowercase) {
		elements.lowercase = document.getElementById('lowercase');
		elements.uppercase = document.getElementById('uppercase');
		elements.numbers = document.getElementById('numbers');
		elements.symbolsSimple = document.getElementById('symbolsSimple');
		elements.symbolsComplex = document.getElementById('symbolsComplex');
		elements.len = document.getElementById('length');
		elements.words = document.getElementById('words');
		elements.overflow = document.getElementById('overflow');
	}
	
	options.lowercase = elements.lowercase.checked;
	options.uppercase = elements.uppercase.checked;
	options.numbers = elements.numbers.checked;
	options.symbolsSimple = elements.symbolsSimple.checked;
	options.symbolsComplex = elements.symbolsComplex.checked;
	options.length = elements.len.value;
	options.words = elements.words.checked;
	options.overflow = elements.overflow.checked;
	
};