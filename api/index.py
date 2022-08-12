# from fastapi import FastAPI, Response, status
from fastapi import FastAPI, Request
# from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse

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

class CustomException(Exception):
	def __init__(self, name: str):
		self.name = name

app = FastAPI()

@app.exception_handler(CustomException)
async def MyCustomExceptionHandler(request: Request, exception: CustomException):
	return JSONResponse (status_code = 400, content = {"error": "error"})

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
async def get_nyc_county(id: int) -> dict:
	# print(">>>>> index > @app.get > /nyccounty: ", id)
	if id in nyc_counties:
		return {"data": nyc_counties[id]}
	else:
		raise CustomException(name = "error")

# @app.get('/nyccounty/{id}', tags=['nyc_county'])
# async def get_nyc_county(id: int) -> dict:
# 	# print(">>>>> index > @app.get > /nyccounty: ", id)
# 	if id in nyc_counties:
# 		return {"data": nyc_counties[id]}
# 	else:
# 	 raise HTTPException(status_code=404, detailX="Required Path Parameter 'id' not found")

#	@app.get('/nyccounty/{id}', tags=['nyc_county'])
#	async def get_nyc_county(response: Response, id: int) -> dict:
#		# print(">>>>> index > @app.get > /nyccounty: ", id)
#		if id in nyc_counties:
#			response.status_code = status.HTTP_200_OK
#			return {"data": nyc_counties[id]}
#		else:
#			response.status_code = status.HTTP_400_BAD_REQUEST
#			return {'error': "Required Path Parameter 'id' not found"}
