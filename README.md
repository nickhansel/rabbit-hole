# Rabbit Hole 🐇

I was going down the YouTube rabbit hole one night and thought to myself that I always find myself going down rabbit holes of interesting information and thoroughly enjoying it. So I made `Rabbit Hole`, an AI based search engine using the Metaphor API that works just like Google or any other search engine where you enter a query and are prompted with results from the internet, but now you are able to find similar web pages based on which pages you find most interesting. Don't feel like reading a whole web page? Don't worry, `Rabbit Hole` uses NLP (PyTorch and transformers) to summarize the webpage so you can save time. See how far you go down the rabbit hole!

# Tech

### Frontend:

- NextJS
- Typescript
- TailwindCSS

### Backend:

- Python
- Flask
- Transformers
- Pytorch

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine and have setup a Metaphor account

- [Python](https://www.python.org/downloads/)

- [Node.js and npm](https://nodejs.org/en/download/)

- [Metaphor API](https://docs.metaphor.systems/reference/getting-started-1)

### Installation

1. Clone the repository:

```bash



git  clone  https://github.com/nickhansel/rabbit-hole.git



cd  rabbit-hole



```

2. Set up the environment:

```bash



make  setup



```

### Usage

1. To run the backend using Python:

```bash



make  run-backend-py  METAPHOR_KEY=your_api_key



```

2. Or to run the backend using Python3:

```bash



make  run-backend-py3  METAPHOR_KEY=your_api_key



```

3. To run the frontend:

```bash



make  run-frontend



```

4. To run both the backend (with Python) and frontend with a single command:

```bash



make  all-py  METAPHOR_KEY=your_api_key



```

5. Or to run both the backend (with Python3) and frontend with a single command:

```bash



make  all-py3  METAPHOR_KEY=your_value



```

### Stopping the services

1. To stop the backend:

```bash



make  stop-backend



```

2. To stop the frontend:

```bash



make  stop-frontend



```

## Authors

- Nick Hansel
