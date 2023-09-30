METAPHOR_KEY ?= default_value

.PHONY: setup run-backend run-frontend stop-backend stop-frontend all

setup: install-backend install-frontend

install-backend:
	pip install -r backend/requirements.txt

install-frontend:
	cd frontend && npm install

# stop any processes on the backend port
stop-backend:
	lsof -t -i tcp:5000 | xargs -r kill -9

# stop any processes on the frontend port
stop-frontend:
	lsof -t -i tcp:3000 | xargs -r kill -9

# run the backend
run-backend-py: stop-backend
	cd backend && METAPHOR_KEY=$(METAPHOR_KEY) python app.py &

# run the backend
run-backend-py3: stop-backend
	cd backend && METAPHOR_KEY=$(METAPHOR_KEY) python3 app.py &

# run the frontend
run-frontend: stop-frontend
	cd frontend && METAPHOR_KEY=$(METAPHOR_KEY) npm run dev &

all-py: setup run-backend-py run-frontend
all-py3: setup run-backend-py3 run-frontend
