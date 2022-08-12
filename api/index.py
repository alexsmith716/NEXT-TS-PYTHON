from fastapi import FastAPI, HTTPException
from typing import Union

from .modules.fibonacci import fib_func

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

app = FastAPI()

@app.get('/todosapi', tags=['todos_root'])
async def read_root() -> dict:
	# print(">>>>> index > @app.get > todosapi <<<<<")
	return {"message": "The Todo List API."}

@app.get('/todosapi/todos', tags=['todos'])
async def get_todos() -> dict:
	# print(">>>>> index > @app.get > /todosapi/todos <<<<<")
	return { "data": todos }

@app.get('/fibonacci', tags=['fibonacci'])
async def get_fibonacci() -> dict:
	fib = fib_func(100)
	# print(">>>>> index > @app.get > /todosapi/fibonacci: ", fib)
	return { "data": fib }

@app.get('/nyccounty/{id}', tags=['nyc_county'])
async def get_nyc_county(id: int) -> Union[dict, str]:
	# print(">>>>> index > @app.get > /nyccounty: ", id)
	if id in nyc_counties:
		return {"data": nyc_counties[id]}
	else:
	 raise HTTPException(status_code=404, detail="ID not found")
