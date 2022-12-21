from os import environ as env
import boto3

def verify_credentials() -> bool:
	try:
		VERCEL_PUBLIC_S3_REGION = env['VERCEL_PUBLIC_S3_REGION']
		VERCEL_PUBLIC_ACCESS_KEY = env['VERCEL_PUBLIC_ACCESS_KEY']
		VERCEL_PUBLIC_SECRET_KEY = env['VERCEL_PUBLIC_SECRET_KEY']
		VERCEL_PUBLIC_S3_BUCKET = env['VERCEL_PUBLIC_S3_BUCKET']
		VERCEL_PUBLIC_S3_BUCKET_KEY = env['VERCEL_PUBLIC_S3_BUCKET_KEY']
	except Exception as error:
		print(error)
		raise

	session = boto3.Session()
	try:
		s3 = session.client(
			's3',
			region_name=VERCEL_PUBLIC_S3_REGION,
			aws_access_key_id=VERCEL_PUBLIC_ACCESS_KEY,
			aws_secret_access_key=VERCEL_PUBLIC_SECRET_KEY,
		)

		s3.get_object(
			Bucket=VERCEL_PUBLIC_S3_BUCKET,
			Key=VERCEL_PUBLIC_S3_BUCKET_KEY,
		)

		return True

	except Exception as error:
		print(error)
		raise
