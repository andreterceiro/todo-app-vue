/**
 * A storage class
 */
class Storage {
    /**
     * Constructor
     * 
     * @returns {this}
     */
    constructor() {
        this.storageName = "tasks";
    }

    /**
     * Sets a new task in the storage
     * 
     * @param {object} task Task to be saved
     *
     * @returns {undefined}
     */
    setNewTask(task) {
        let tasks = this.readAll();
        tasks.push(task)

        localStorage.setItem(
            this.storageName, 
            JSON.stringify(tasks)
        );
    }

    /**
     * Returns an entry based on its ID (property id, not index)
     * 
     * @returns {object}
     */
    get(id) {
        const tasks = this.readAll();

        for (const task of tasks) {
            if (task.id == id) {
                return task;
            }
        }

        throw ReferenceError("A task with this ID does not exists");
    }

    /**
     * See the "id" of the last entry, increments one and 
     * returns it
     * 
     * @returns {number} 
     */
    getNewID() {
        const tasks = this.readAll();
        if (tasks.length == 0) {
            return 1;
        }

        return tasks[tasks.length - 1].id + 1;
    }

    /**
     * Returns all entries (tasks) stored in the storage
     * 
     * @returns {object} An array
     */
    readAll() {
        const tasks = JSON.parse(
            localStorage.getItem(this.storageName)
        );

        if (tasks === null) {
            return [];
        }
        return tasks;
    }

    /**
     * Sets the storage name. It is not necessary to use if you
     * wanna use the default storage name "tasks", but you can
     * change it here
     * 
     * @throws {TypeError} If the storage name passed as parameter
     *                     is not a string
     * 
     * @param {string} storageName The desired new storage name
     * 
     * @returns {undefined}
     */
    setStorageName(storageName) {
        if (typeof storageName != "string") {
            throw new TypeError("storageName needs to be a string");
        }

        this.storageName = storageName;
    }
}