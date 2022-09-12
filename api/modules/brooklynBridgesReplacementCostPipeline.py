from typing import Generator
from .fetchS3 import fetch_s3

def brooklyn_bridges_replacement_cost_pipeline(awsAccess: dict, awssdkpython: dict) -> Generator[dict, None, None]:
	rows = (i.decode('utf-8').rstrip().split(",") for i in fetch_s3(awsAccess, awssdkpython, True))
	heading = rows.__next__()
	dictionaries = (dict(zip(heading, data)) for data in rows)

	replacementBrooklyn = (int(dictionary["REPLACEMENT COST"]) for dictionary in dictionaries if dictionary["BORO"] == "B")

	replacementBrooklynTotal = 0
	for i in replacementBrooklyn:
		replacementBrooklynTotal += i

	returnData = {
		'data': str(replacementBrooklynTotal),
	}

	yield returnData

# from typing import AsyncGenerator
# from .fetchS3 import fetch_s3
# 
# async def brooklyn_bridges_replacement_cost_pipeline(awsAccess: dict, awssdkpython: dict) -> AsyncGenerator[dict, None]:
# 	rows = (i.decode().rstrip().split(",") async for i in fetch_s3(awsAccess, awssdkpython, True))
# 	heading = await rows.__anext__()
# 	dictionaries = (dict(zip(heading, data)) async for data in rows)
# 	replacementBrooklyn = (int(dictionary["REPLACEMENT COST"]) async for dictionary in dictionaries if dictionary["BORO"] == "B")
# 
# 	replacementBrooklynTotal = 0
# 	async for i in replacementBrooklyn:
# 		replacementBrooklynTotal += i
# 
# 	returnData = {
# 		'data': str(replacementBrooklynTotal),
# 	}
# 
# 	yield returnData
