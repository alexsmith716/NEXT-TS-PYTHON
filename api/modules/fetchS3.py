import os
import boto3
from typing import Generator
#from sys import getsizeof

def fetch_s3(iterLines: bool) -> Generator[bytes, None, None]:
	session = boto3.Session()
	s3 = session.client(
		's3',
		region_name=os.environ.get('VERCEL_PUBLIC_S3_REGION'),
		aws_access_key_id=os.environ.get('VERCEL_PUBLIC_ACCESS_KEY'),
		aws_secret_access_key=os.environ.get('VERCEL_PUBLIC_SECRET_KEY'),
	)

	s3_ob = s3.get_object(
		Bucket=os.environ.get('VERCEL_PUBLIC_S3_BUCKET'),
		Key=os.environ.get('VERCEL_PUBLIC_S3_BUCKET_KEY'),
	)

	if iterLines:
		for chunk in s3_ob['Body'].iter_lines():
			yield chunk
	else:
		for chunk in s3_ob['Body']:
			yield chunk
