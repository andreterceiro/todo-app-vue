/**
 * A storage class
 */
class Storage {
    /**
     * Constructor
     * 
     * @returns {this}
     */
    constructor(server='') {
        if (server != '') {
            this.server = server;
        } else {
            this.server = 'http://127.0.0.1:8000'
        }
    }

    /**
     * Save all tasks
     *
     * @async
     *
     * @param {object} tasks Tasks to be saved
     *
     * @returns {undefined}
     */
    async saveAll(tasks) {
        if (typeof tasks != "object" || tasks == null) {
            throw new TypeError("Tasks need to be an object not null")
        }

        await fetch(
            `${this.server}/tasks/saveAll/`,
            {
                method: "POST",
                body: JSON.stringify(tasks),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }
        );
    }

    /**
     * Saves the task
     *
     * @async
     *
     * @param {string} taskString Value to be saved
     *
     * @throws {Error} If the value to be saved is empty
     *
     * @returns {undefined}
     */
    async saveNewTask(taskString) {
        await fetch(
            `${this.server}/tasks/save/`,
            {
                method: "POST",
                body: JSON.stringify({checked: false, name: taskString}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }
        );
    }

    /**
     * Returns an entry based on its ID (property id, not index)
     * 
     * @returns {object}
     */
    async get(id) {
        const response = await fetch(`${this.server}/tasks/get/${id}`);
        return response.json();
    }

    /**
     * Returns all entries (tasks) stored in the storage
     * 
     * @returns {object} An array
     */
    async readAll() {
        const response = await fetch(this.server + '/tasks/getAll');
        return response.json();
    }

    /**
     * Deletes a task from the storage
     *
     * @async
     * 
     * @throws {TypeError}  If the parameter ID does not be
     *                      a number
     * @throws {RangeError} If the a task with the passed ID
     *                      cannot be found
     *
     * @param {number} id The ID of the task tp be deleted
     */
    async delete(id) {
        if (typeof id !== "number") {
            throw new TypeError("ID needs to be an integer");
        }

        const response = await fetch(`${this.server}/tasks/delete/${id}`);
        return response.json();
    }
}