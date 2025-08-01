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
        register(emoji, { src }) {
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

                        let width, height;
                        if (options.width && options.height) {
                            width = options.width;
                            height = options.height;
                        } else if (options.size) {
                            width = height = options.size;
                        } else {
                            const computed = window.getComputedStyle(parent);
                            const fontSize = parseFloat(computed.fontSize) || 16;
                            const autoSize = Math.floor(fontSize * 0.95) + "px";
                            width = height = autoSize;
                        }

                        img.style.width = width;
                        img.style.height = height;
                        img.style.verticalAlign = options.verticalAlign || "text-bottom";
                        img.style.display = options.display || "inline-block";
                        img.style.objectFit = "contain";

                        if (options.marginRight) img.style.marginRight = options.marginRight;
                        if (options.marginLeft) img.style.marginLeft = options.marginLeft;

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
