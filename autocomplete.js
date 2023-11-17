class Autocomplete {
    constructor(textarea) {
        this.textarea = textarea;
        this.rules = [
            {trigger: '[', action: (key) => this.insertPair(key, ']')},
            {trigger: '{', action: (key) => this.insertPair(key, '}')},
            {trigger: "'", action: (key) => this.insertPair(key, "'")},
            {trigger: '"', action: (key) => this.insertPair(key, '"')}
            // Add more rules here
        ];

        this.attachEvents();
    }

    attachEvents() {
        this.textarea.addEventListener('keypress', (event) => this.handleKeypress(event));
    }

    handleKeypress(event) {
        const rule = this.rules.find(r => r.trigger === event.key);
        if (rule) {
            event.preventDefault(); // Prevent the default keypress action
            rule.action.call(this, event.key);
        } else if (this.lastInserted === '[' && event.key === ']') {
            event.preventDefault();
            this.moveCaretOutside();
        }
    }

    insertPair(openChar, closingChar) {
        const position = this.textarea.selectionStart;
        const currentValue = this.textarea.value;
        this.textarea.value = currentValue.slice(0, position) + openChar + closingChar + currentValue.slice(position);
        this.textarea.selectionStart = this.textarea.selectionEnd = position + 1;
        this.lastInserted = openChar; 
    }

    moveCaretOutside() {
        const position = this.textarea.selectionStart;
        this.textarea.selectionStart = this.textarea.selectionEnd = position + 1;
        this.lastInserted = null; // Reset last inserted character
    }

    // Add more action methods as needed
}