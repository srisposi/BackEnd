const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    firstName: String
    description: String
  }

  type Query {
    lastName: String
    getAllTasks: [Task]
    getTask(id: ID): Task
  }

  input TaskInput {
    firstName: String
    description: String
  }

  type Mutation {
    createTask(task: TaskInput): Task
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
  }
`;

module.exports = {
  typeDefs,
};
