const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;


  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  }
  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params; 
  const {title,url,techs,likes} = request.body
  const repositoryId = repositories.findIndex(repository => repository.id == id)
  

  if(repositoryId>=0){
    const repository = {
      id,title,url,techs,likes: 1,
    }
    repositories[repositoryId] = repository
    return response.status(200).json(repository)}
  else{
    return response.status(400).json({error:"Error"})
  }


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params; 
  const repositoryId = repositories.findIndex(repository => repository.id == id)
  if(repositoryId>=0){
    repositories.splice(repositoryId,1)
    return response.status(204).send()
  }
  else{
    return response.status(400).json({error:"Error"})
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params; 
  const {title,url,techs,likes} = request.body
  const repositoryId = repositories.findIndex(repository => repository.id == id);
  if(repositoryId>=0){
    repositories[repositoryId].likes +=1
    return response.json(repositories[repositoryId])
  }
  else{
    return response.status(400).json({error:"Error"})
  }
});

module.exports = app;
