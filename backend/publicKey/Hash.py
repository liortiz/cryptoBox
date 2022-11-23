def newascii(ch):
	ascii_value = ord(ch) + 100;
	return ascii_value;

def oldascii(ascii_val):
	old_ascii = int(float(ascii_val)) - 100;
	return old_ascii;


string = ''
#dec_message = ''

def encode(msg):
	string_ascii = ''
	for i in msg:
		string_ascii+=str(newascii(i));

	return string_ascii;

def decode(newascii_string):
	pack = ''
	i = 0
	dec_message = ''
	while (i < len(str(newascii_string))):
		
		pack = newascii_string[i:i+3]
		dec_message+=chr(oldascii(pack))
		i=i+3

	return dec_message;	