const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for 
    ${persons.length} people</p><p>${Date(Date.now())}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(400).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const { name, number } = body;
  console.log(name, number);

  if (!name || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const uname = persons.find((person) => person.name === name);
  if (uname) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: name,
    number: number,
    id: Math.ceil(Math.random() * 500),
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server running at port", PORT);
});

//mongodb+srv://<username>:<password>@closter.jdkenmq.mongodb.net/?retryWrites=true&w=majority&appName=closter
