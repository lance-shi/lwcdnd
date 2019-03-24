import { LightningElement, track } from 'lwc';
import { tasks } from 'c/data';

export default class Lwcdnd extends LightningElement {
    @track tasklist = tasks;
    @track leftTasks = [];
    @track rightTasks = [];
    @track draggingid = "";

    connectedCallback() {
        this.distributeTasks();
    }

    distributeTasks() {
        let curLeftTasks = [];
        let curRightTasks = [];
        this.tasklist.forEach(function(t){
            if(t.category === "wip") {
                curLeftTasks.push(t);
            } else {
                curRightTasks.push(t);
            }
        });

        this.leftTasks = curLeftTasks;
        this.rightTasks = curRightTasks;
    }

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleItemDrag(evt) {
        console.log('Dragged id is: ' + evt.detail);
        this.draggingid = evt.detail;
    }

    handleDrop(evt) {
        let id = this.draggingid;
        console.log('Received id is: ' + id);

        let tasks = this.tasklist.filter((task) => {
			if (task.taskid === id) {
			    task.category = "complete";           
			}              
			return task;       
		});

        this.tasklist = tasks;
        this.distributeTasks();
    }
}