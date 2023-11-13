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
     * Saves the task
     *
     * @param {string} taskString Value to be saved
     *
     * @throws {Error} If the value to be saved is empty
     *
     * @returns {undefined}
     */
    saveNewTask(taskString) {
        if (taskString.trim() == "") {
            throw(Error("The text of the tesk cannot be empty"));
        }

        let tasks = JSON.parse(
            localStorage.getItem(
                this.storageName
            )
        );

        if (tasks == null) {
            tasks = [];
        }

        tasks.push(
            {
                "id": storage.getNewID(),
                "name": taskString,
                "checked": false
            }
        );
        localStorage.setItem(
            "tasks",
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
     * Deletes a task from the storage
     *
     * @throws {TypeError}  If the parameter ID does not be
     *                      a number
     * @throws {RangeError} If the a task with the passed ID
     *                      cannot be found
     *
     * @param {number} id The ID of the task tp be deleted
     */
    delete(id) {
        if (typeof id !== "number") {
            throw new TypeError("ID needs to be an integer");
        }

        let tasks = storage.readAll();

        let valuesToSave = [];
        for (const i in tasks) {
            if (tasks[i].id != id) {
                valuesToSave.push(
                    tasks[i]
                );
            }
        }

        if (valuesToSave.length == tasks.length) {
            throw new RangeError("A task with this ID does not exists");
        }

        localStorage.setItem(
            "tasks",
            JSON.stringify(valuesToSave)
        );
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