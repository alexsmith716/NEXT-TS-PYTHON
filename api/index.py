import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse

from .modules.fibonacci import fib_func
from .modules.verifyCredentials import verify_credentials
from .modules.brooklynBridgesReplacementCostPipeline import brooklyn_bridges_replacement_cost_pipeline
from .modules.fetchS3 import fetch_s3

todos = [
	{
		"id": 1,
		"item": "Todo number one."
	},
	{
		"id": 2,
		"item": "Todo number two."
	},
	{
		"id": 3,
		"item": "Todo number three."
	},
	{
		"id": 4,
		"item": "Todo number four."
	},
]

awsAccess = {
	"region": os.environ.get('NEXT_PUBLIC_S3_REGION'),
	"ak": os.environ.get('ACCESS_KEY'),
	"sk": os.environ.get('SECRET_KEY'),
}

awssdkpython = {
	"bucket": os.environ.get('NEXT_PUBLIC_S3_BUCKET'),
	"key": os.environ.get('NEXT_PUBLIC_S3_BUCKET_KEY'),
}

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
async def CustomExceptionHandler(request: Request, exception: CustomException):
	return JSONResponse(status_code=400, content={"error": "Error attempting to fetch resource."})

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

@app.get('/botosssgetobject/brooklynbridgesreplacementcost', tags=['brooklyn_bridges_replacement_cost'])
async def get_brooklyn_bridges_replacement_cost():
	try:
		if verify_credentials(awsAccess, awssdkpython):
			# for i in brooklyn_bridges_replacement_cost_pipeline(awsAccess, awssdkpython):
			#  return i
			return brooklyn_bridges_replacement_cost_pipeline(awsAccess, awssdkpython).__next__()
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

@app.get('/botosssgetobject/streambridgeratings', tags=['stream_bridge_ratings'])
async def stream_bridge_ratings():
	try:
		if verify_credentials(awsAccess, awssdkpython):
			return StreamingResponse(
				fetch_s3(awsAccess, awssdkpython, False),
				media_type="text/csv",
				headers={
					"Content-Type": "text/csv",
				}
			)
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

	# @app.get('/botosssgetobject/brooklynbridgesreplacementcost', tags=['brooklyn_bridges_replacement_cost'])
	# async def get_brooklyn_bridges_replacement_cost():
	# 	try:
	# 		if await verify_credentials(awsAccess, awssdkpython):
	# 			# async for i in brooklyn_bridges_replacement_cost_pipeline(awsAccess, awssdkpython):
	# 			#   return i
	# 			return await brooklyn_bridges_replacement_cost_pipeline(awsAccess, awssdkpython).__anext__()
	# 
	# 	except Exception as error:
	# 		print(error)
	# 		raise CustomException(name = "error")

	# @app.get('/botosssgetobject/streambridgeratings', tags=['stream_bridge_ratings'])
	# async def stream_bridge_ratings():
	# 	try:
	# 		if await verify_credentials(awsAccess, awssdkpython):
	# 			return StreamingResponse(
	# 				fetch_s3(awsAccess, awssdkpython, False),
	# 				media_type="text/csv",
	# 				headers={
	# 					"Content-Type": "text/csv",
	# 				}
	# 			)
	# 	except Exception as error:
	# 		print(error)
	# 		raise CustomException(name = "error")
