import boto3
from typing import Generator

def fetch_s3(awsAccess: dict, awssdkpython: dict, iterLines: bool) -> Generator[bytes, None, None]:
	session = boto3.Session()
	s3 = session.client(
		's3',
		region_name=awsAccess['region'],
		aws_access_key_id=awsAccess['ak'],
		aws_secret_access_key=awsAccess['sk'],
	)

	s3_ob = s3.get_object(
		Bucket=awssdkpython['bucket'],
		Key=awssdkpython['key'],
	)

	if iterLines:
		for chunk in s3_ob['Body'].iter_lines():
			yield chunk
	else:
		for chunk in s3_ob['Body']:
			yield chunk

# import aioboto3
# from typing import AsyncGenerator
# 
# async def fetch_s3(awsAccess: dict, awssdkpython: dict, iterLines: bool) -> AsyncGenerator[bytes, None]:
# 	session = aioboto3.Session()
# 	async with session.client(
# 		's3',
# 		region_name=awsAccess['region'],
# 		aws_access_key_id=awsAccess['ak'],
# 		aws_secret_access_key=awsAccess['sk'],
# 	) as s3:
# 
# 		s3_ob = await s3.get_object(
# 			Bucket=awssdkpython['bucket'],
# 			Key=awssdkpython['key'],
# 		)
# 
# 		if iterLines:
# 			async for chunk in s3_ob['Body'].iter_lines():
# 				yield chunk
# 		else:
# 			async for chunk in s3_ob['Body']:
# 				yield chunk
