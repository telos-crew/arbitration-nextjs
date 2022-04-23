export const validateName = (name: string) => {
	const validCharacters = 'abcdefghijklmnopqrstuvwxyz123456'
	const validCharacterList = validCharacters.split('')
	let isValid = true
	if (name.includes('.')) {
		if (name.length < 3 || name.length > 12) {
			isValid = false
		}
	} else {
		if (name.length !== 12) {
			isValid = false
		}
	}
	const nameCharacterList = name.split('')
	for (const character of nameCharacterList) {
		if (!validCharacterList.includes(character)) {
			isValid = false
		}
	}
	return isValid
}

export const validateIpfsHash = (url: string) => {
	if (url.length !== 46 && url.length !== 49) return false
	return true
}