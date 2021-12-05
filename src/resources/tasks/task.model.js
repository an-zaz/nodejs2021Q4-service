const uuidv4 = require('uuid').v4;

class Task {
    constructor({
                    id = uuidv4(),
                    title,
                    order,
                    description,
                    userId,
                    boardId,
                    columnId,
                } = {}) {
        this.id = id;
        this.order = order;
        this.title = title;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
        this.description = description;
    }

    toResponse() {
        const { id, title, order, description, userId, boardId, columnId } = this;
        return { id, title, order, description, userId, boardId, columnId };
    }
}

module.exports = Task;
