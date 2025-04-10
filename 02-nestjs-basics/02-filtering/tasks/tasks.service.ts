import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    const currentPage = page || 1;
    const currentLimit = limit || 10;

    if (currentPage <= 0 || currentLimit <= 0) {
      throw new NotFoundException("Page and limit must be greater than 0");
    }

    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    return filteredTasks.slice(startIndex, endIndex);
  }
}
