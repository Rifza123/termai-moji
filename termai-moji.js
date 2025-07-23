function TermaiMoji() {
	const emojiMap = {};
	const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;

	function toEmojiFileName(emoji) {
		const codePoints = Array.from(emoji).map((c) =>
			c.codePointAt(0).toString(16)
		);
		return "emoji_u" + codePoints.join("_") + ".png";
	}

	return {
		register(emoji, {
			src
		}) {
			emojiMap[emoji] = src;
		},

		init(base = "https://c.termai.cc/emojis/ios/") {
			const text = document.body.innerText;
			const found = text.match(emojiRegex) || [];

			found.forEach((emoji) => {
				if (!(emoji in emojiMap)) {
					const fileName = toEmojiFileName(emoji);
					this.register(emoji, {
						src: base + fileName
					});
				}
			});
		},

		parse(element, options = {}) {
			if (!element) return;

			const walk = document.createTreeWalker(
				element,
				NodeFilter.SHOW_TEXT,
				null,
				false
			);
			const nodes = [];

			while (walk.nextNode()) {
				nodes.push(walk.currentNode);
			}

			nodes.forEach((textNode) => {
				const parent = textNode.parentNode;
				const text = textNode.nodeValue;

				let matched = false;
				const fragments = document.createDocumentFragment();

				let lastIndex = 0;
				for (let i = 0; i < text.length;) {
					const char = text[i];
					const codePoint = text.codePointAt(i);
					const emoji = String.fromCodePoint(codePoint);
					const emojiLength = emoji.length;

					if (emojiMap[emoji]) {
						if (i > lastIndex) {
							fragments.appendChild(
								document.createTextNode(text.slice(lastIndex, i))
							);
						}

						const img = document.createElement("img");
						img.src = emojiMap[emoji];
						img.alt = emoji;
						img.style.width = options.width || "1em";;
						img.style.height = options.height || "1em";;
						img.style.verticalAlign = options.verticalAlign || "middle";
						img.style.display = options.display || "inline";
						img.style.objectFit = options.objectFit || "contain";
						img.style.maxHeight = options.maxHeight || "10em";
						img.style.marginRight = "2px"
						
						fragments.appendChild(img);
						matched = true;
						i += emojiLength;
						lastIndex = i;
					} else {
						i += emoji.length;
					}
				}

				if (matched) {
					if (lastIndex < text.length) {
						fragments.appendChild(
							document.createTextNode(text.slice(lastIndex))
						);
					}
					parent.replaceChild(fragments, textNode);
				}
			});
		},
	};
}
