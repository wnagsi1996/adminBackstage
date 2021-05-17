import cryptoJs from 'crypto-js'
let keyOne = '313233356536373a'  //秘钥长度

// 加密
export const encryption=function(value){
	let key = cryptoJs.enc.Hex.parse(keyOne)
	let enc = ''
	if (typeof value === 'string') {
	  enc = cryptoJs.AES.encrypt(value, key, {
		// iv: iv
		mode: cryptoJs.mode.ECB,
		padding: cryptoJs.pad.Pkcs7
	  })
	} else if (typeof value === 'object') {
	  let data = JSON.stringify(value)
	  enc = cryptoJs.AES.encrypt(data, key, {
		// iv: iv
		mode: cryptoJs.mode.ECB,
		padding: cryptoJs.pad.Pkcs7
	  })
	}
	let encResult = enc.ciphertext.toString()
	return encResult
}

//解密
export const ecrypt=function(value){
	let key = cryptoJs.enc.Hex.parse(keyOne)
	let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(value), key, {
	  // vi: vi
	  mode: cryptoJs.mode.ECB,
	  padding: cryptoJs.pad.Pkcs7
	})
	let decData = cryptoJs.enc.Utf8.stringify(dec)
	return decData
}