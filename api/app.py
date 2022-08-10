from fastapi import FastAPI

from . import fibonacci

todos = [
	{
		"id": "1",
		"item": "Todo number one."
	},
	{
		"id": "2",
		"item": "Todo number two."
	}
]

app = FastAPI()

@app.get('/todosapi', tags=['root'])
async def read_root() -> dict:
	# print(">>>>> app > @app.get > todosapi <<<<<")
	return {"message": "The Todo List API."}

@app.get('/todosapi/todos', tags=['todos'])
async def get_todos() -> dict:
	# print(">>>>> app > @app.get > /todosapi/todos <<<<<")
	return { "data": todos }

@app.get('/fibonacci', tags=['fibonacci'])
def get_fibonacci() -> dict:
	fib = fibonacci.fib(100)
	# print(">>>>> app > @app.get > /todosapi/fibonacci: ", fib)
	return { "data": fib }
