const uuidv4 = require('uuid').v4;

class Board {
    constructor({
                    id = uuidv4(),
                    title,
                    columns = [],
                } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}

module.exports = Board;
