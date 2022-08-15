# from fastapi import FastAPI, Response, status
from fastapi import FastAPI, Request
# from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from .modules.fibonacci import fib_func

# https://fastapi.tiangolo.com/python-types/#type-hints-in-fastapi

todos = [
	{
		"id": "1",
		"item": "Todo number one."
	},
	{
		"id": "2",
		"item": "Todo number two."
	},
	{
		"id": "3",
		"item": "Todo number three."
	},
	{
		"id": "4",
		"item": "Todo number four."
	},
]

nyc_counties = {}
nyc_counties[1] = "Bronx"
nyc_counties[2] = "Kings"
nyc_counties[3] = "New York"
nyc_counties[4] = "Queens"
nyc_counties[5] = "Richmond"

class CustomException(Exception):
	def __init__(self, name: str):
		self.name = name

app = FastAPI()

@app.exception_handler(CustomException)
async def MyCustomExceptionHandler(request: Request, exception: CustomException):
	return JSONResponse (status_code = 400, content = {"error": "error"})

@app.get('/todosapi', tags=['todos_root'])
async def read_root() -> dict:
	return {"message": "The Todo List API."}

@app.get('/todosapi/todos', tags=['todos'])
async def get_todos() -> dict:
	if todos:
		return { "data": todos }
	else:
		raise CustomException(name = "error")

@app.get('/fibonacci/{len}', tags=['fibonacci'])
async def get_fibonacci(len: int) -> dict:
	if len > 1:
		try:
			fib = fib_func(len)
			return { "data": fib }
		except:
			raise CustomException(name = "error")
	else:
		raise CustomException(name = "error")

@app.get('/nyccounty/{id}', tags=['nyc_county'])
async def get_nyc_county(id: int) -> dict:
	if id > 0 and id < 6:
		return {"data": nyc_counties[id]}
	else:
		raise CustomException(name = "error")
