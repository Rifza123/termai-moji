function TermaiMoji() {
  const emojiMap = {};

  function toEmojiFileName(emoji) {
    const codePoints = [];
    for (const char of [...emoji]) {
      codePoints.push(char.codePointAt(0).toString(16));
    }
    return 'emoji_'+ 'u' + codePoints.join('_') + '.png';
  }
  
  return {
    register(emoji, { src }) {
      emojiMap[emoji] = src;
    },
    
    init(base = "https://raw.githubusercontent.com/Rifza123/termai-moji/refs/heads/main/emojis/ios/") {
      const emojiSet = new Set();
      const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

      while (treeWalker.nextNode()) {
        const text = treeWalker.currentNode.nodeValue;
        const emojiRegex = /\p{Extended_Pictographic}/gu;
        let match;
        while ((match = emojiRegex.exec(text)) !== null) {
          emojiSet.add(match[0]);
        }
      }

      emojiSet.forEach((emoji) => {
        const fileName = toEmojiFileName(emoji);
        this.register(emoji, { src: base + fileName });
      });
    },
    
    parse(element, options = {}) {
      if (!element) return;

      const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      const nodes = [];

      const size = options.size || "1em"; 

      while (walk.nextNode()) {
        nodes.push(walk.currentNode);
      }

      nodes.forEach((textNode) => {
        const parent = textNode.parentNode;
        const fragments = document.createDocumentFragment();
        let text = textNode.nodeValue;

        Object.keys(emojiMap).forEach((emoji) => {
          const parts = text.split(emoji);
          if (parts.length > 1) {
            for (let i = 0; i < parts.length; i++) {
              fragments.appendChild(document.createTextNode(parts[i]));
              if (i < parts.length - 1) {
                const img = document.createElement('img');
                img.style.width = size;
                img.style.height = size;
                img.style.verticalAlign = "text-bottom"; img.style.display = "inline-block";
                img.style.objectFit = "contain"; 
                img.style.margin = "0"; 
                img.style.padding = "0";
                img.style.lineHeight = "1";
                img.style.maxHeight = "1em";
              }
            }
            parent.replaceChild(fragments, textNode);
            text = "";
          }
        });
      });
    }
  }
}